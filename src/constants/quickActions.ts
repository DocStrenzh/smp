export type QuickActionId =
  | "callback"
  | "email"
  | "question"
  | "review"
  | "map";

export type QuickAction = {
  id: QuickActionId;
  title: string;
  icon: string;
  activeIcon?: string;
};

export const quickActions: QuickAction[] = [
  {
    id: "callback",
    title: "Обратный звонок",
    icon: "/images/quick-actions/phone-active.png",
    activeIcon: "/images/quick-actions/phone-active.svg",
  },
  {
    id: "question",
    title: "Задать вопрос",
    icon: "/images/quick-actions/mail-active.png",
    activeIcon: "/images/quick-actions/question-active.png",
  },
  {
    id: "review",
    title: "Оставить отзыв",
    icon: "/images/quick-actions/question-active.png",
    activeIcon: "/images/quick-actions/review-active.svg",
  },
  {
    id: "map",
    title: "Посмотреть карту",
    icon: "/images/quick-actions/map-active.png",
    activeIcon: "/images/quick-actions/map-active.png",
  },
];
