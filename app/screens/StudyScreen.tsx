import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
    Animated,
    Easing,
    PanResponder,
    View,
    useWindowDimensions,
} from "react-native";
import { UIStudyFlashcard } from "../../ui/UIStudyFlashcard";
import type {
    UIFlashcardSide,
    UIFlashcardStatus,
} from "../../ui/UIStudyFlashcard";
import {
    studyFlashcardCategoryLabelMap,
    studyFlashcardDifficultyLabelMap,
    studyFlashcardMockData,
    type StudyFlashcardMockItem,
} from "../data/studyFlashcards";

const minimumSwipeThreshold = 56;
const edgeResistance = 0.22;

type VisibleCardSlot = "previous" | "current" | "next";

interface VisibleCardItem {
    slot: VisibleCardSlot;
    card: StudyFlashcardMockItem | null;
}

function getStudyQuestion(card: StudyFlashcardMockItem) {
    return card.maskText ?? card.example ?? "点击翻面查看释义与答案。";
}

function getStudyTip(card: StudyFlashcardMockItem) {
    return [
        `Difficulty: ${studyFlashcardDifficultyLabelMap[card.difficulty]}`,
        card.example ? `Example: ${card.example}` : undefined,
        card.tags.length > 0 ? `Tags: ${card.tags.join(" · ")}` : undefined,
    ]
        .filter(Boolean)
        .join("\n");
}

function getStudyExplanation(card: StudyFlashcardMockItem) {
    return [
        `Meaning: ${card.back}`,
        card.example ? `Example: ${card.example}` : undefined,
        card.maskText ? `Cloze: ${card.maskText}` : undefined,
        card.tags.length > 0 ? `- Tags: ${card.tags.join(" · ")}` : undefined,
    ]
        .filter(Boolean)
        .join("\n");
}

export function StudyScreen() {
    const { height } = useWindowDimensions();
    const dragY = useRef(new Animated.Value(0)).current;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [side, setSide] = useState<UIFlashcardSide>("front");
    const [statusById, setStatusById] = useState<
        Partial<Record<string, UIFlashcardStatus>>
    >({});
    const [isAnimating, setIsAnimating] = useState(false);
    const [currentCardHeight, setCurrentCardHeight] = useState(0);

    const currentCard = studyFlashcardMockData[currentIndex] ?? null;
    const canGoPrevious = currentIndex > 0;
    const canGoNext = currentIndex < studyFlashcardMockData.length - 1;
    const swipeDistance = Math.max(height, 480);
    const stackOffset = Math.min(height * 0.62, 420);

    const visibleCards = useMemo<VisibleCardItem[]>(
        () => [
            {
                slot: "previous",
                card: studyFlashcardMockData[currentIndex - 1] ?? null,
            },
            {
                slot: "current",
                card: currentCard,
            },
            {
                slot: "next",
                card: studyFlashcardMockData[currentIndex + 1] ?? null,
            },
        ],
        [currentCard, currentIndex],
    );

    const getCardStatus = useCallback(
        (card: StudyFlashcardMockItem | null) => {
            if (!card) {
                return "idle";
            }

            return statusById[card.id] ?? "idle";
        },
        [statusById],
    );

    const effectiveSwipeThreshold = Math.max(
        currentCardHeight / 2,
        minimumSwipeThreshold,
    );

    const resetToCenter = useCallback(() => {
        setIsAnimating(true);
        Animated.spring(dragY, {
            toValue: 0,
            tension: 120,
            friction: 12,
            useNativeDriver: true,
        }).start(() => {
            setIsAnimating(false);
        });
    }, [dragY]);

    const finishSwipe = useCallback(
        (direction: "previous" | "next") => {
            const nextIndex =
                direction === "previous" ? currentIndex - 1 : currentIndex + 1;
            const canMove =
                direction === "previous" ? canGoPrevious : canGoNext;

            if (!canMove) {
                resetToCenter();
                return;
            }

            setIsAnimating(true);
            Animated.timing(dragY, {
                toValue:
                    direction === "previous" ? swipeDistance : -swipeDistance,
                duration: 220,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: true,
            }).start(({ finished }) => {
                dragY.setValue(0);

                if (finished) {
                    setCurrentIndex(nextIndex);
                }

                setIsAnimating(false);
            });
        },
        [
            canGoNext,
            canGoPrevious,
            currentIndex,
            dragY,
            resetToCenter,
            swipeDistance,
        ],
    );

    const handleStatusSelect = useCallback(
        (nextStatus: UIFlashcardStatus) => {
            if (!currentCard) {
                return;
            }

            // 记录结果后直接上滑切到下一张，保持刷卡节奏连续。
            setStatusById((previous) => ({
                ...previous,
                [currentCard.id]: nextStatus,
            }));

            if (canGoNext) {
                finishSwipe("next");
            }
        },
        [canGoNext, currentCard, finishSwipe],
    );

    useEffect(() => {
        // 切卡后回到正面，避免上一张的翻面状态影响新卡。
        setSide("front");
    }, [currentIndex]);

    const panResponder = useMemo(
        () =>
            PanResponder.create({
                onMoveShouldSetPanResponder: (_, gestureState) => {
                    if (isAnimating) {
                        return false;
                    }

                    return (
                        Math.abs(gestureState.dy) > 12 &&
                        Math.abs(gestureState.dy) > Math.abs(gestureState.dx)
                    );
                },
                onPanResponderGrant: () => {
                    dragY.stopAnimation();
                },
                onPanResponderMove: (_, gestureState) => {
                    let nextDragY = gestureState.dy;

                    // 到边界后加阻尼，保留轻微的拖拽反馈。
                    if (
                        (nextDragY > 0 && !canGoPrevious) ||
                        (nextDragY < 0 && !canGoNext)
                    ) {
                        nextDragY *= edgeResistance;
                    }

                    dragY.setValue(nextDragY);
                },
                onPanResponderRelease: (_, gestureState) => {
                    // 没有拖过半张卡时回弹，只有超过半张才真正翻到上一张/下一张。
                    if (gestureState.dy >= effectiveSwipeThreshold) {
                        finishSwipe("previous");
                        return;
                    }

                    if (gestureState.dy <= -effectiveSwipeThreshold) {
                        finishSwipe("next");
                        return;
                    }

                    resetToCenter();
                },
                onPanResponderTerminate: () => {
                    resetToCenter();
                },
            }),
        [
            canGoNext,
            canGoPrevious,
            dragY,
            effectiveSwipeThreshold,
            finishSwipe,
            isAnimating,
            resetToCenter,
        ],
    );

    function getAnimatedCardStyle(slot: VisibleCardSlot) {
        if (slot === "current") {
            return {
                opacity: dragY.interpolate({
                    inputRange: [-swipeDistance, 0, swipeDistance],
                    outputRange: [0.42, 1, 0.42],
                    extrapolate: "clamp",
                }),
                transform: [
                    { translateY: dragY },
                    {
                        scale: dragY.interpolate({
                            inputRange: [-swipeDistance, 0, swipeDistance],
                            outputRange: [0.94, 1, 0.94],
                            extrapolate: "clamp",
                        }),
                    },
                ],
            };
        }

        if (slot === "previous") {
            return {
                opacity: dragY.interpolate({
                    inputRange: [-swipeDistance, 0, swipeDistance],
                    outputRange: [0.1, 0.22, 1],
                    extrapolate: "clamp",
                }),
                transform: [
                    { translateY: dragY },
                    { translateY: -stackOffset },
                    {
                        scale: dragY.interpolate({
                            inputRange: [-swipeDistance, 0, swipeDistance],
                            outputRange: [0.88, 0.9, 1],
                            extrapolate: "clamp",
                        }),
                    },
                ],
            };
        }

        return {
            opacity: dragY.interpolate({
                inputRange: [-swipeDistance, 0, swipeDistance],
                outputRange: [1, 0.22, 0.1],
                extrapolate: "clamp",
            }),
            transform: [
                { translateY: dragY },
                { translateY: stackOffset },
                {
                    scale: dragY.interpolate({
                        inputRange: [-swipeDistance, 0, swipeDistance],
                        outputRange: [1, 0.9, 0.88],
                        extrapolate: "clamp",
                    }),
                },
            ],
        };
    }

    return (
        <View className="flex-1 bg-surface">
            <View
                className="relative flex-1 items-center justify-center overflow-hidden px-5 py-6"
                {...panResponder.panHandlers}
            >
                {visibleCards.map(({ slot, card }) => {
                    if (!card) {
                        return null;
                    }

                    return (
                        <Animated.View
                            className="absolute w-full"
                            key={slot}
                            onLayout={
                                slot === "current"
                                    ? (event) => {
                                          setCurrentCardHeight(
                                              event.nativeEvent.layout.height,
                                          );
                                      }
                                    : undefined
                            }
                            pointerEvents={slot === "current" ? "auto" : "none"}
                            style={{
                                zIndex: slot === "current" ? 3 : 1,
                                ...getAnimatedCardStyle(slot),
                            }}
                        >
                            <UIStudyFlashcard
                                answer={card.answer ?? card.front}
                                category={
                                    studyFlashcardCategoryLabelMap[
                                        card.category
                                    ]
                                }
                                className="w-full"
                                disabled={slot !== "current" || isAnimating}
                                explanation={getStudyExplanation(card)}
                                onFlip={
                                    slot === "current"
                                        ? () => {
                                              setSide((previous) =>
                                                  previous === "front"
                                                      ? "back"
                                                      : "front",
                                              );
                                          }
                                        : undefined
                                }
                                onKnown={
                                    slot === "current"
                                        ? () => handleStatusSelect("known")
                                        : undefined
                                }
                                onUnknown={
                                    slot === "current"
                                        ? () => handleStatusSelect("unknown")
                                        : undefined
                                }
                                question={getStudyQuestion(card)}
                                side={slot === "current" ? side : "front"}
                                status={getCardStatus(card)}
                                tip={getStudyTip(card)}
                                title={card.front}
                            />
                        </Animated.View>
                    );
                })}
            </View>
        </View>
    );
}
