export type Task = {
  id: string
  title: string
  emoji: string
  earned: number // 今日已賺到的星星數（用嚟顯示）
}

export type Reward = {
  id: string
  title: string
  emoji: string
  cost: number
  redeemed: number // 已兌換次數
}

export type Profile = {
  name: string
  avatar: string
}

export const AVATARS = ['🐶', '🐱', '🐰', '🦊', '🐻', '🐼', '🐨', '🦁', '🐸', '🐵', '🦄', '🐯']

/**
 * 預設任務清單 — 參考 ClassDojo 常見的正向行為技能，
 * 改寫成適合小朋友嘅每日任務。
 */
export const DEFAULT_TASKS: Task[] = [
  { id: 'task-ontask', title: '專心做功課', emoji: '📚', earned: 0 },
  { id: 'task-hardwork', title: '努力嘗試', emoji: '💪', earned: 0 },
  { id: 'task-helping', title: '幫助他人', emoji: '🤝', earned: 0 },
  { id: 'task-participate', title: '積極參與', emoji: '🙋', earned: 0 },
  { id: 'task-teamwork', title: '團隊合作', emoji: '👫', earned: 0 },
  { id: 'task-respect', title: '有禮貌', emoji: '🙏', earned: 0 },
  { id: 'task-persist', title: '堅持唔放棄', emoji: '🎯', earned: 0 },
  { id: 'task-tidy', title: '自己收拾玩具', emoji: '🧸', earned: 0 },
  { id: 'task-teeth', title: '自己刷牙洗面', emoji: '🪥', earned: 0 },
  { id: 'task-read', title: '閱讀 15 分鐘', emoji: '📖', earned: 0 },
]

export const DEFAULT_REWARDS: Reward[] = [
  { id: 'reward-cartoon', title: '睇卡通', emoji: '📺', cost: 5, redeemed: 0 },
  { id: 'reward-icecream', title: '食雪糕', emoji: '🍦', cost: 10, redeemed: 0 },
  { id: 'reward-park', title: '去公園玩', emoji: '🏞️', cost: 15, redeemed: 0 },
  { id: 'reward-game', title: '玩 30 分鐘遊戲', emoji: '🎮', cost: 20, redeemed: 0 },
  { id: 'reward-toy', title: '買一件小玩具', emoji: '🎁', cost: 30, redeemed: 0 },
]

export const TASK_EMOJIS = ['📚', '💪', '🤝', '🙋', '👫', '🙏', '🎯', '🧸', '🪥', '📖', '🛏️', '🍚', '🎨', '🎵', '⚽', '🚿']
export const REWARD_EMOJIS = ['📺', '🍦', '🏞️', '🎮', '🎁', '🍭', '🍕', '🎬', '🧁', '🚲', '🎪', '🏊', '🍿', '🎠', '🦖', '⭐']
