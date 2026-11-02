'use client'

import { createContext, useContext, type ReactNode } from 'react'
import { useLocalStorage } from '@/hooks/use-local-storage'

export type Lang = 'zh' | 'en' | 'ja'

export const LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: 'zh', label: '廣東話', flag: '🇭🇰' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
]

type Dict = {
  appTitle: string
  appSubtitle: string
  footer: string
  // profile
  setupTitle: string
  namePlaceholder: string
  save: string
  greeting: string
  editProfile: string
  myStars: string
  defaultChildName: string
  chooseAvatar: string
  // tasks
  tasksTitle: string
  add: string
  cancel: string
  taskPlaceholder: string
  addBtn: string
  noTasks: string
  earned: string
  addStarAria: string
  addOne: string
  deleteTaskAria: string
  // rewards
  rewardsTitle: string
  rewardPlaceholder: string
  need: string
  noRewards: string
  redeemedTimes: string
  redeem: string
  notEnough: string
  deleteRewardAria: string
  redeemToast: string
}

export const translations: Record<Lang, Dict> = {
  zh: {
    appTitle: '⭐ 儲星星獎勵 ⭐',
    appSubtitle: '完成任務儲星星，換取心愛獎勵！',
    footer: '資料會自動儲存喺呢部裝置 🔒',
    setupTitle: '設定你嘅頭像同名字',
    namePlaceholder: '輸入名字…',
    save: '儲存',
    greeting: '你好呀！',
    editProfile: '編輯個人資料',
    myStars: '我嘅星星',
    defaultChildName: '小朋友',
    chooseAvatar: '選擇頭像 {x}',
    tasksTitle: '📋 今日任務',
    add: '新增',
    cancel: '取消',
    taskPlaceholder: '例如：自己執書包',
    addBtn: '加入',
    noTasks: '未有任務，撳「新增」加一個啦！',
    earned: '已賺 {n} ⭐',
    addStarAria: '為「{x}」加 1 顆星',
    addOne: '加 1',
    deleteTaskAria: '刪除「{x}」',
    rewardsTitle: '🎁 獎勵商店',
    rewardPlaceholder: '獎勵名稱，例如：食薯條',
    need: '需要',
    noRewards: '未有獎勵，撳「新增」設定一個啦！',
    redeemedTimes: '已換 {n} 次',
    redeem: '兌換',
    notEnough: '星星唔夠',
    deleteRewardAria: '刪除獎勵「{x}」',
    redeemToast: '🎉 換到「{x}」喇！',
  },
  en: {
    appTitle: '⭐ Star Rewards ⭐',
    appSubtitle: 'Finish tasks, collect stars, win prizes!',
    footer: 'Your data is saved on this device 🔒',
    setupTitle: 'Pick your avatar and name',
    namePlaceholder: 'Enter a name…',
    save: 'Save',
    greeting: 'Hello!',
    editProfile: 'Edit profile',
    myStars: 'My Stars',
    defaultChildName: 'Kiddo',
    chooseAvatar: 'Choose avatar {x}',
    tasksTitle: "📋 Today's Tasks",
    add: 'Add',
    cancel: 'Cancel',
    taskPlaceholder: 'e.g. Pack my school bag',
    addBtn: 'Add',
    noTasks: 'No tasks yet. Tap "Add" to create one!',
    earned: 'Earned {n} ⭐',
    addStarAria: 'Give 1 star to "{x}"',
    addOne: '+1',
    deleteTaskAria: 'Delete "{x}"',
    rewardsTitle: '🎁 Reward Shop',
    rewardPlaceholder: 'Reward name, e.g. French fries',
    need: 'Needs',
    noRewards: 'No rewards yet. Tap "Add" to set one!',
    redeemedTimes: 'Redeemed {n}x',
    redeem: 'Redeem',
    notEnough: 'Not enough',
    deleteRewardAria: 'Delete reward "{x}"',
    redeemToast: '🎉 You got "{x}"!',
  },
  ja: {
    appTitle: '⭐ ごほうびスター ⭐',
    appSubtitle: 'タスクをこなしてスターを集め、ごほうびをもらおう！',
    footer: 'データはこの端末に保存されます 🔒',
    setupTitle: 'アバターと名前をえらんでね',
    namePlaceholder: '名前をいれてね…',
    save: 'ほぞん',
    greeting: 'こんにちは！',
    editProfile: 'プロフィールをへんしゅう',
    myStars: 'わたしのスター',
    defaultChildName: 'ちびっこ',
    chooseAvatar: 'アバター {x} をえらぶ',
    tasksTitle: '📋 きょうのタスク',
    add: 'ついか',
    cancel: 'キャンセル',
    taskPlaceholder: 'れい：じぶんでかばんをかたづける',
    addBtn: 'ついか',
    noTasks: 'タスクがありません。「ついか」でつくってね！',
    earned: '{n} ⭐ かくとく',
    addStarAria: '「{x}」にスターを1つあげる',
    addOne: '+1',
    deleteTaskAria: '「{x}」をけす',
    rewardsTitle: '🎁 ごほうびショップ',
    rewardPlaceholder: 'ごほうびのなまえ、れい：ポテト',
    need: 'ひつよう',
    noRewards: 'ごほうびがありません。「ついか」でせっていしてね！',
    redeemedTimes: '{n}かい こうかん',
    redeem: 'こうかん',
    notEnough: 'スターがたりない',
    deleteRewardAria: 'ごほうび「{x}」をけす',
    redeemToast: '🎉 「{x}」をゲット！',
  },
}

/** 預設任務嘅多語言標題（按 ID 對應，自訂任務唔會喺度） */
export const DEFAULT_TASK_LABELS: Record<string, Record<Lang, string>> = {
  'task-ontask': { zh: '專心做功課', en: 'Focus on homework', ja: 'しゅくだいにしゅうちゅう' },
  'task-hardwork': { zh: '努力嘗試', en: 'Try my best', ja: 'いっしょうけんめいがんばる' },
  'task-helping': { zh: '幫助他人', en: 'Help others', ja: 'ひとをたすける' },
  'task-participate': { zh: '積極參與', en: 'Join in actively', ja: 'せっきょくてきにさんか' },
  'task-teamwork': { zh: '團隊合作', en: 'Teamwork', ja: 'チームワーク' },
  'task-respect': { zh: '有禮貌', en: 'Be polite', ja: 'れいぎ正しくする' },
  'task-persist': { zh: '堅持唔放棄', en: "Don't give up", ja: 'あきらめない' },
  'task-tidy': { zh: '自己收拾玩具', en: 'Tidy up my toys', ja: 'おもちゃをかたづける' },
  'task-teeth': { zh: '自己刷牙洗面', en: 'Brush teeth & wash face', ja: 'はみがき・かおをあらう' },
  'task-read': { zh: '閱讀 15 分鐘', en: 'Read for 15 minutes', ja: '15ふんどくしょ' },
}

/** 預設獎勵嘅多語言標題（按 ID 對應） */
export const DEFAULT_REWARD_LABELS: Record<string, Record<Lang, string>> = {
  'reward-cartoon': { zh: '睇卡通', en: 'Watch cartoons', ja: 'アニメをみる' },
  'reward-icecream': { zh: '食雪糕', en: 'Eat ice cream', ja: 'アイスをたべる' },
  'reward-park': { zh: '去公園玩', en: 'Go to the park', ja: 'こうえんであそぶ' },
  'reward-game': { zh: '玩 30 分鐘遊戲', en: 'Play games for 30 min', ja: '30ぷんゲーム' },
  'reward-toy': { zh: '買一件小玩具', en: 'Buy a small toy', ja: 'ちいさなおもちゃをかう' },
}

type I18nValue = {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: keyof Dict, vars?: Record<string, string | number>) => string
  taskTitle: (id: string, fallback: string) => string
  rewardTitle: (id: string, fallback: string) => string
}

const I18nContext = createContext<I18nValue | null>(null)

function interpolate(template: string, vars?: Record<string, string | number>) {
  if (!vars) return template
  return template.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? `{${k}}`))
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useLocalStorage<Lang>('star-app:lang', 'zh')

  const value: I18nValue = {
    lang,
    setLang,
    t: (key, vars) => interpolate(translations[lang][key], vars),
    taskTitle: (id, fallback) => DEFAULT_TASK_LABELS[id]?.[lang] ?? fallback,
    rewardTitle: (id, fallback) => DEFAULT_REWARD_LABELS[id]?.[lang] ?? fallback,
  }

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
