// @ts-nocheck
// 多模态沉浸式泛听与 TPR (全身反应) 引擎数据结构
// ----------------------------------------------------------------------------
// 方法学溯源：
//   1. TPR (Total Physical Response) - Dr. James Asher
//   2. Comprehensible Input (可理解性输入) - Stephen Krashen
//
// 核心纪律（红线）：
//   - 本文件下的所有数据结构，**严禁出现 `zh` (中文翻译) 字段**！
//   - 所有的理解必须通过 `visualAnchors` 或 `interactiveAction` 达成。
//
// 配图纪律（2026-08 目视）：
//   - emoji + label 永不失效；imageUrl 只挂「打开且画面就是这个词」的图。
//   - 人（boy/mom/dad）不用真实人物照片，只用 emoji。
//   - HTTP 200 不等于图对。钟不是手账，跑不是水坑。

export const IMMERSION_PACKS = [
  {
    id: 'tpr-a1-kitchen-01',
    level: 'A1',
    mode: 'tpr_action',
    titleEn: 'In the Kitchen',
    taskEn: 'Listen to the instruction and move the items.',
    scenes: [
      {
        step: 1,
        audioPrompt: 'Put the red apple on the table.',
        visualAnchors: [
          { id: 'apple_red', type: 'draggable', emoji: '🍎', label: 'red apple', imageUrl: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=800&q=80' },
          { id: 'apple_green', type: 'draggable', emoji: '🍏', label: 'green apple', imageUrl: 'https://images.unsplash.com/photo-1610999162204-828195e48803?w=800&q=80' },
          { id: 'table', type: 'dropzone', emoji: '🍽️', label: 'table', imageUrl: 'https://images.unsplash.com/photo-1614597445336-8a67e9314d91?w=800&q=80' }
        ],
        expectedAction: {
          actionType: 'drag_and_drop',
          subjectId: 'apple_red',
          targetId: 'table'
        },
        recastOnFail: 'Not quite. Put the RED apple on the table.'
      },
      {
        step: 2,
        audioPrompt: 'Now, give the green apple to the boy.',
        visualAnchors: [
          { id: 'apple_green', type: 'draggable', emoji: '🍏', label: 'green apple', retainFromPrevious: true },
          { id: 'boy', type: 'dropzone', emoji: '👦', label: 'boy' }
        ],
        expectedAction: {
          actionType: 'drag_and_drop',
          subjectId: 'apple_green',
          targetId: 'boy'
        },
        recastOnFail: 'Give the GREEN apple to the BOY.'
      },
      {
        step: 3,
        audioPrompt: 'Now, give the red apple to the boy.',
        visualAnchors: [
          { id: 'apple_red', type: 'draggable', emoji: '🍎', label: 'red apple', retainFromPrevious: true },
          { id: 'boy', type: 'dropzone', emoji: '👦', label: 'boy', retainFromPrevious: true }
        ],
        expectedAction: {
          actionType: 'drag_and_drop',
          subjectId: 'apple_red',
          targetId: 'boy'
        },
        recastOnFail: 'Give the RED apple to the BOY.'
      }
    ]
  },

  {
    id: 'tpr-a1-bedroom-01',
    level: 'A1',
    mode: 'tpr_action',
    titleEn: 'In the Bedroom',
    taskEn: 'Listen to the instruction and move the items.',
    scenes: [
      {
        step: 1,
        audioPrompt: 'Put the pillow on the bed.',
        visualAnchors: [
          { id: 'pillow', type: 'draggable', emoji: '🤍', label: 'pillow', imageUrl: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&q=80' },
          { id: 'book', type: 'draggable', emoji: '📚', label: 'book', imageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80' },
          { id: 'bed', type: 'dropzone', emoji: '🛏️', label: 'bed', imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80' }
        ],
        expectedAction: {
          actionType: 'drag_and_drop',
          subjectId: 'pillow',
          targetId: 'bed'
        },
        recastOnFail: 'Put the PILLOW on the bed.'
      },
      {
        step: 2,
        audioPrompt: 'Now, give the book to mom.',
        visualAnchors: [
          { id: 'book', type: 'draggable', emoji: '📚', label: 'book', retainFromPrevious: true },
          { id: 'mom', type: 'dropzone', emoji: '👩', label: 'mom' }
        ],
        expectedAction: {
          actionType: 'drag_and_drop',
          subjectId: 'book',
          targetId: 'mom'
        },
        recastOnFail: 'Give the BOOK to MOM.'
      },
      {
        step: 3,
        audioPrompt: 'Now, give the pillow to mom.',
        visualAnchors: [
          { id: 'pillow', type: 'draggable', emoji: '🤍', label: 'pillow', retainFromPrevious: true },
          { id: 'mom', type: 'dropzone', emoji: '👩', label: 'mom', retainFromPrevious: true }
        ],
        expectedAction: {
          actionType: 'drag_and_drop',
          subjectId: 'pillow',
          targetId: 'mom'
        },
        recastOnFail: 'Give the PILLOW to MOM.'
      }
    ]
  },

  {
    id: 'tpr-a1-clothes-01',
    level: 'A1',
    mode: 'tpr_action',
    titleEn: 'Get Dressed',
    taskEn: 'Listen to the instruction and move the items.',
    scenes: [
      {
        step: 1,
        audioPrompt: 'Put the shoes by the door.',
        visualAnchors: [
          { id: 'shoes', type: 'draggable', emoji: '👟', label: 'shoes', imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80' },
          { id: 'cap', type: 'draggable', emoji: '🧢', label: 'cap' },
          { id: 'door', type: 'dropzone', emoji: '🚪', label: 'door' }
        ],
        expectedAction: {
          actionType: 'drag_and_drop',
          subjectId: 'shoes',
          targetId: 'door'
        },
        recastOnFail: 'Put the SHOES by the door.'
      },
      {
        step: 2,
        audioPrompt: 'Now, give the cap to dad.',
        visualAnchors: [
          { id: 'cap', type: 'draggable', emoji: '🧢', label: 'cap', retainFromPrevious: true },
          { id: 'dad', type: 'dropzone', emoji: '👨', label: 'dad' }
        ],
        expectedAction: {
          actionType: 'drag_and_drop',
          subjectId: 'cap',
          targetId: 'dad'
        },
        recastOnFail: 'Give the CAP to DAD.'
      },
      {
        step: 3,
        audioPrompt: 'Now, give the shoes to dad.',
        visualAnchors: [
          { id: 'shoes', type: 'draggable', emoji: '👟', label: 'shoes', retainFromPrevious: true },
          { id: 'dad', type: 'dropzone', emoji: '👨', label: 'dad', retainFromPrevious: true }
        ],
        expectedAction: {
          actionType: 'drag_and_drop',
          subjectId: 'shoes',
          targetId: 'dad'
        },
        recastOnFail: 'Give the SHOES to DAD.'
      }
    ]
  },

  {
    id: 'tpr-a1-park-01',
    level: 'A1',
    mode: 'tpr_action',
    titleEn: 'At the Park',
    taskEn: 'Listen to the instruction and move the items.',
    scenes: [
      {
        step: 1,
        audioPrompt: 'Give the ball to the boy.',
        visualAnchors: [
          { id: 'ball', type: 'draggable', emoji: '⚽', label: 'ball', imageUrl: 'https://images.unsplash.com/photo-1614632537197-38a17061c2bd?w=800&q=80' },
          { id: 'bag', type: 'draggable', emoji: '🎒', label: 'bag', imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80' },
          { id: 'boy', type: 'dropzone', emoji: '👦', label: 'boy' }
        ],
        expectedAction: {
          actionType: 'drag_and_drop',
          subjectId: 'ball',
          targetId: 'boy'
        },
        recastOnFail: 'Give the BALL to the BOY.'
      },
      {
        step: 2,
        audioPrompt: 'Now, put the bag on the bench.',
        visualAnchors: [
          { id: 'bag', type: 'draggable', emoji: '🎒', label: 'bag', retainFromPrevious: true },
          { id: 'bench', type: 'dropzone', emoji: '🪑', label: 'bench' }
        ],
        expectedAction: {
          actionType: 'drag_and_drop',
          subjectId: 'bag',
          targetId: 'bench'
        },
        recastOnFail: 'Put the BAG on the bench.'
      },
      {
        step: 3,
        audioPrompt: 'Now, give the bag to the boy.',
        visualAnchors: [
          { id: 'bag', type: 'draggable', emoji: '🎒', label: 'bag', retainFromPrevious: true },
          { id: 'boy', type: 'dropzone', emoji: '👦', label: 'boy', retainFromPrevious: true }
        ],
        expectedAction: {
          actionType: 'drag_and_drop',
          subjectId: 'bag',
          targetId: 'boy'
        },
        recastOnFail: 'Give the BAG to the BOY.'
      }
    ]
  },

  {
    id: 'stream-a1-morning-rush',
    level: 'A1',
    mode: 'visual_story',
    titleEn: 'Morning Rush',
    durationMs: 15000,
    timeline: [
      {
        timeMs: 0,
        audioText: 'Oh no, it is 8 AM! I am late!',
        emoji: '⏰',
        focusKeyword: 'late'
      },
      {
        timeMs: 4000,
        audioText: 'I grab my bag.',
        emoji: '🎒',
        imageAnchor: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
        focusKeyword: 'bag'
      },
      {
        timeMs: 7000,
        audioText: 'I run to the bus station.',
        emoji: '🏃',
        focusKeyword: 'run'
      },
      {
        timeMs: 10000,
        audioText: 'Wait! The bus is leaving! Stop!',
        emoji: '🚌',
        imageAnchor: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&q=80',
        focusKeyword: 'leaving'
      }
    ],
    comprehensionCheck: {
      questionAudio: 'Why is the man running?',
      options: [
        { id: 'opt1', emoji: '⏰', label: 'he is late', isCorrect: true },
        { id: 'opt2', emoji: '🏋️', label: 'exercise', isCorrect: false }
      ]
    }
  },

  {
    id: 'stream-a1-park-day',
    level: 'A1',
    mode: 'visual_story',
    titleEn: 'A Day at the Park',
    durationMs: 14000,
    timeline: [
      {
        timeMs: 0,
        audioText: 'I go to the park.',
        emoji: '🌳',
        focusKeyword: 'park'
      },
      {
        timeMs: 3500,
        audioText: 'I take my ball.',
        emoji: '⚽',
        imageAnchor: 'https://images.unsplash.com/photo-1614632537197-38a17061c2bd?w=800&q=80',
        focusKeyword: 'ball'
      },
      {
        timeMs: 7000,
        audioText: 'I kick the ball.',
        emoji: '👟',
        focusKeyword: 'kick'
      },
      {
        timeMs: 10500,
        audioText: 'I am happy!',
        emoji: '😄',
        focusKeyword: 'happy'
      }
    ],
    comprehensionCheck: {
      questionAudio: 'What do I take to the park?',
      options: [
        { id: 'opt1', emoji: '⚽', label: 'a ball', imageUrl: 'https://images.unsplash.com/photo-1614632537197-38a17061c2bd?w=800&q=80', isCorrect: true },
        { id: 'opt2', emoji: '🍎', label: 'an apple', imageUrl: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=800&q=80', isCorrect: false }
      ]
    }
  }
];
