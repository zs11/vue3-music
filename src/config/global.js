const TABS = [
  {
    name: "推荐",
    path: '/recommend'
  },
  {
    name: "排行",
    path: '/top-list',
  },
  {
    name: "歌手",
    path: '/singer'
  },
  {
    name: "视频",
    path: '/video'
  }
]

const SINGERSWITCH = {
  AREA: [
    {
      type: '全部',
      key: 'all',
      id: -1
    },
    {
      type: '内地',
      key: 'inland',
      id: 0
    },
    {
      type: '港台',
      key: 'hk&tw',
      id: 1
    }
  ],
  CATEGORY: [
    {
      type: '全部',
      key: 'all',
      id: -1
    },
    {
      type: '男',
      key: 'man',
      id: 0
    },
    {
      type: '女',
      key: 'woman',
      id: 1
    },
    {
      type: '组合',
      key: 'combination',
      id: 2
    }
  ],
  GENRE: [
    {
      type: '全部',
      key: 'all',
      id: -1
    },
    {
      type: '流行',
      key: 'popular',
      id: 0
    },
    {
      type: '说唱',
      key: 'rap',
      id: 1
    },
    {
      type: '国风',
      key: 'nation_style',
      id: 2
    },
    {
      type: '摇滚',
      key: 'rock',
      id: 3
    },
    {
      type: '电子',
      key: 'electronics',
      id: 4
    },
    {
      type: '民谣',
      key: 'ballad',
      id: 5
    },
    {
      type: 'R&B',
      key: 'R&B',
      id: 6
    },
    {
      type: '民族乐',
      key: 'nation_music',
      id: 7
    }
  ]
}

export {
  TABS,
  SINGERSWITCH
}