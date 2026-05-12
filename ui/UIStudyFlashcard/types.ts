export type UIFlashcardSide = "front" | "back";

export type UIFlashcardStatus = "idle" | "known" | "unknown";

export interface UIStudyFlashcardProps {
    /** 分类标签，显示在卡片左上角胶囊中。 */
    category?: string;
    /** 卡片主标题。 */
    title: string;
    /** 正反面都会展示的问题文案。 */
    question: string;
    /** 正面提示信息。 */
    tip?: string;
    /** 反面解释信息，支持长文本与换行。 */
    explanation?: string;
    /** 反面高亮答案。 */
    answer?: string;
    /** 当前展示面，默认 front。 */
    side?: UIFlashcardSide;
    /** 卡片状态：空闲、已知、未知。 */
    status?: UIFlashcardStatus;
    /** 是否禁用全部交互。 */
    disabled?: boolean;
    /** 点击翻面区域时触发。 */
    onFlip?: () => void;
    /** 点击 KNOWN 时触发。 */
    onKnown?: () => void;
    /** 点击 UNKNOWN 时触发。 */
    onUnknown?: () => void;
    /** 点击更多按钮时触发。 */
    onMore?: () => void;
    /** 传给卡片根节点的 NativeWind className 覆盖。 */
    className?: string;
}
