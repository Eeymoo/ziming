# UIStudyFlashcard

`UIStudyFlashcard` 是一个基于 Stitch 中间白色学习卡片还原的学习闪卡组件。

它只实现卡片本体，不包含任何页面级结构。

## 设计目标

该组件用于承载单张学习卡片内容，并尽量贴近 Stitch screen 中间白色 flashcard 的视觉表现，包括：

- 卡片白色背景
- 大圆角外观
- 细边框与轻柔阴影
- 内部大留白与内容层级
- category pill
- more button
- 标题与题目文案排版
- tip / explanation 信息块
- flip area
- `UNKNOWN / KNOWN` 操作区
- selected / pressed / long content 等状态表现

## 不包含的内容

该组件不会实现以下页面元素：

- 页面背景
- 顶部 header
- 关闭按钮
- 页面标题
- 进度条
- 底部 tab bar
- 外层页面级容器

如果你需要完整页面，请在页面层自行组合该组件。

## 目录结构

- `index.ts`：组件与类型导出
- `UIStudyFlashcard.tsx`：主组件
- `types.ts`：组件类型定义
- `tokens.ts`：组件内 NativeWind token
- `parts/FlashcardMeta.tsx`：顶部信息区
- `parts/FlashcardFront.tsx`：正面内容区
- `parts/FlashcardBack.tsx`：反面内容区
- `parts/FlashcardFlipArea.tsx`：翻面操作区
- `parts/FlashcardActionBar.tsx`：`UNKNOWN / KNOWN` 操作区

## Props

### 类型定义

- `UIFlashcardSide = "front" | "back"`
- `UIFlashcardStatus = "idle" | "known" | "unknown"`

### `UIStudyFlashcardProps`

- `category?: string`
  - 分类标签，显示在左上角 pill 中。
- `title: string`
  - 卡片主标题。
- `question: string`
  - 题目正文。
- `tip?: string`
  - 正面提示信息。
- `explanation?: string`
  - 反面解释信息，支持长文本与多行内容。
- `answer?: string`
  - 反面底部高亮答案。
- `side?: UIFlashcardSide`
  - 当前展示面，默认是 `front`。
- `status?: UIFlashcardStatus`
  - 当前状态，默认是 `idle`。
- `disabled?: boolean`
  - 是否禁用交互。
- `onFlip?: () => void`
  - 点击翻面区域时触发。
- `onKnown?: () => void`
  - 点击 `KNOWN` 时触发。
- `onUnknown?: () => void`
  - 点击 `UNKNOWN` 时触发。
- `onMore?: () => void`
  - 点击更多按钮时触发。
- `className?: string`
  - 根节点额外 className。

## 支持的视觉状态

组件支持以下主要状态：

1. front side
2. back side
3. known selected
4. unknown selected
5. pressed state
6. long content state

### 状态说明

- `side="front"`
  - 展示标题、题目、tip。
- `side="back"`
  - 展示标题、题目、explanation、answer。
- `status="idle"`
  - 正常可交互状态。
- `status="known"`
  - 卡片进入已掌握状态，卡片高亮并显示选中态。
- `status="unknown"`
  - 卡片进入未掌握状态，底部左侧按钮高亮。
- `disabled={true}`
  - 禁用全部交互。

## 交互规则

- 在 `idle` 状态下：
  - 可点击 more button
  - 可点击 flip area
  - 可点击 `UNKNOWN / KNOWN`
- 在 `known / unknown` 已选择状态下：
  - 维持选中样式
  - 顶部 more button 不再展示或不可操作
  - flip area 显示 `Revealed`
  - action bar 保持选中态展示

## explanation 内容格式建议

`explanation` 支持普通段落和简单步骤列表。

可使用以下写法：

- 普通段落：直接传入文本
- 编号步骤：`1. ...`、`2. ...`
- 无序步骤：`- ...` 或 `• ...`
- 多段内容：使用换行分隔

组件会自动把这些内容排成更接近 Stitch 的 explanation 区块样式。

## 基础用法

```tsx
import { UIStudyFlashcard } from '@/ui/UIStudyFlashcard'

export function Example() {
  return (
    <UIStudyFlashcard
      category="Civil Service Exam"
      title="Administrative Aptitude Test: Quantitative Reasoning"
      question="A train travels at a speed of 60 km/h. If it passes a 200m long bridge in 30 seconds, what is the length of the train in meters?"
      tip="Tip: Remember to convert km/h to m/s before calculating."
      side="front"
      status="idle"
      onFlip={() => {}}
      onKnown={() => {}}
      onUnknown={() => {}}
      onMore={() => {}}
    />
  )
}
```

## 反面示例

```tsx
<UIStudyFlashcard
  category="Civil Service Exam"
  title="Administrative Aptitude Test: Quantitative Reasoning"
  question="A train travels at a speed of 60 km/h. If it passes a 200m long bridge in 30 seconds, what is the length of the train in meters?"
  explanation={[
    '1. Speed = 60 km/h = (60 × 5/18) m/s = 50/3 m/s',
    '2. Distance covered in 30s = Speed × Time',
    '3. Distance = (50/3) × 30 = 500 meters',
    '4. Total Distance = Train Length + Bridge Length',
  ].join('\n')}
  answer="Train Length = 500 - 200 = 300m"
  side="back"
  status="idle"
  onFlip={() => {}}
  onKnown={() => {}}
  onUnknown={() => {}}
/>
```

## 已掌握状态示例

```tsx
<UIStudyFlashcard
  category="Biology 101"
  title="Mitochondria Function"
  question="What is the primary function of the mitochondria in a eukaryotic cell?"
  side="front"
  status="known"
/>
```

## 未掌握状态示例

```tsx
<UIStudyFlashcard
  category="History"
  title="Treaty of Versailles"
  question="In what year was the Treaty of Versailles signed, effectively ending World War I?"
  side="front"
  status="unknown"
/>
```

## 样式实现说明

该组件默认样式来自：

- 组件内 `tokens.ts` 的 NativeWind class token
- `tailwind.config.js` 中补充的 flashcard 相关颜色与阴影 token

如果你要微调样式，优先修改：

1. `ui/UIStudyFlashcard/tokens.ts`
2. `tailwind.config.js` 中对应 token

不建议直接在组件内散落新增默认样式，以免破坏与 Stitch 的一致性。

## 开发说明

当前仓库没有完整测试运行器，建议修改后通过以下命令验证类型：

```bash
pnpm exec tsc --noEmit
```

## 备注

该组件的目标是还原 Stitch screen 中间的白色学习卡片，而不是重新设计一个新的卡片风格。
如果后续需要进一步对齐视觉，请继续以 Stitch 中间卡片本体为唯一参考。