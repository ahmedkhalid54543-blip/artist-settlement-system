// 艺人数据
const artists = [
  {
    id: 1,
    name: "金智秀 (Kim Jisoo)",
    stageName: "JISOO",
    group: "BLACKPINK",
    debutDate: "2016-08-08",
    contractType: "独家",
    revenueShare: 70,
    status: "active",
    avatar: "👩‍🎤",
    monthlyRevenue: 850000000,
    activities: 12
  },
  {
    id: 2,
    name: "朴彩英 (Park Chaeyoung)",
    stageName: "ROSÉ",
    group: "BLACKPINK",
    debutDate: "2016-08-08",
    contractType: "独家",
    revenueShare: 70,
    status: "active",
    avatar: "👩‍🎤",
    monthlyRevenue: 780000000,
    activities: 10
  },
  {
    id: 3,
    name: "金珍妮 (Kim Jennie)",
    stageName: "JENNIE",
    group: "BLACKPINK",
    debutDate: "2016-08-08",
    contractType: "独家",
    revenueShare: 70,
    status: "active",
    avatar: "👩‍🎤",
    monthlyRevenue: 920000000,
    activities: 15
  },
  {
    id: 4,
    name: "李知恩 (Lee Jieun)",
    stageName: "IU",
    group: "SOLO",
    debutDate: "2008-09-18",
    contractType: "独家",
    revenueShare: 65,
    status: "active",
    avatar: "👩‍🎤",
    monthlyRevenue: 1200000000,
    activities: 18
  },
  {
    id: 5,
    name: "边伯贤 (Byun Baekhyun)",
    stageName: "BAEKHYUN",
    group: "EXO",
    debutDate: "2012-04-08",
    contractType: "独家",
    revenueShare: 60,
    status: "active",
    avatar: "👨‍🎤",
    monthlyRevenue: 650000000,
    activities: 8
  },
  {
    id: 6,
    name: "张元英 (Jang Wonyoung)",
    stageName: "WONYOUNG",
    group: "IVE",
    debutDate: "2021-12-01",
    contractType: "独家",
    revenueShare: 55,
    status: "active",
    avatar: "👩‍🎤",
    monthlyRevenue: 580000000,
    activities: 14
  }
];

// 活动数据
const activities = [
  { id: 1, artistId: 1, type: "演唱会", name: "BORN PINK 首尔安可场", date: "2025-09-15", revenue: 350000000, cost: 80000000, status: "completed" },
  { id: 2, artistId: 1, type: "广告代言", name: "Dior 全球大使", date: "2025-09-01", revenue: 200000000, cost: 20000000, status: "completed" },
  { id: 3, artistId: 1, type: "综艺", name: "Running Man 特别篇", date: "2025-09-20", revenue: 50000000, cost: 5000000, status: "completed" },
  { id: 4, artistId: 3, type: "演唱会", name: "BORN PINK 首尔安可场", date: "2025-09-15", revenue: 350000000, cost: 80000000, status: "completed" },
  { id: 5, artistId: 3, type: "广告代言", name: "Chanel 品牌大使", date: "2025-09-05", revenue: 250000000, cost: 25000000, status: "completed" },
  { id: 6, artistId: 3, type: "Solo专辑", name: "RUBY 数字专辑", date: "2025-09-10", revenue: 180000000, cost: 30000000, status: "completed" },
  { id: 7, artistId: 4, type: "演唱会", name: "IU H.E.R. 世界巡演", date: "2025-09-12", revenue: 500000000, cost: 120000000, status: "completed" },
  { id: 8, artistId: 4, type: "广告代言", name: "真露烧酒代言", date: "2025-09-01", revenue: 150000000, cost: 15000000, status: "completed" },
  { id: 9, artistId: 4, type: "电视剧", name: "《您辛苦了》OST", date: "2025-09-18", revenue: 80000000, cost: 10000000, status: "completed" },
  { id: 10, artistId: 2, type: "演唱会", name: "BORN PINK 首尔安可场", date: "2025-09-15", revenue: 350000000, cost: 80000000, status: "completed" },
  { id: 11, artistId: 5, type: "综艺", name: "认识的哥哥", date: "2025-09-08", revenue: 30000000, cost: 3000000, status: "completed" },
  { id: 12, artistId: 6, type: "广告代言", name: "Miu Miu 品牌大使", date: "2025-09-03", revenue: 120000000, cost: 12000000, status: "completed" },
  { id: 13, artistId: 1, type: "粉丝见面会", name: "JISOO 生日见面会", date: "2025-10-03", revenue: 80000000, cost: 15000000, status: "scheduled" },
  { id: 14, artistId: 3, type: "时尚活动", name: "巴黎时装周", date: "2025-10-05", revenue: 60000000, cost: 20000000, status: "scheduled" },
  { id: 15, artistId: 4, type: "演唱会", name: "IU H.E.R. 东京场", date: "2025-10-10", revenue: 450000000, cost: 100000000, status: "scheduled" }
];

// 结算记录
const settlements = [
  { id: 1, artistId: 1, month: "2025-09", totalRevenue: 600000000, totalCost: 105000000, artistShare: 70, artistAmount: 346500000, companyAmount: 148500000, tax: 34650000, netAmount: 311850000, status: "paid", paidDate: "2025-10-05" },
  { id: 2, artistId: 3, month: "2025-09", totalRevenue: 780000000, totalCost: 135000000, artistShare: 70, artistAmount: 451500000, companyAmount: 193500000, tax: 45150000, netAmount: 406350000, status: "paid", paidDate: "2025-10-05" },
  { id: 3, artistId: 4, month: "2025-09", totalRevenue: 730000000, totalCost: 145000000, artistShare: 65, artistAmount: 380250000, companyAmount: 204750000, tax: 38025000, netAmount: 342225000, status: "pending", paidDate: null },
  { id: 4, artistId: 2, month: "2025-09", totalRevenue: 350000000, totalCost: 80000000, artistShare: 70, artistAmount: 189000000, companyAmount: 81000000, tax: 18900000, netAmount: 170100000, status: "paid", paidDate: "2025-10-05" },
  { id: 5, artistId: 5, month: "2025-09", totalRevenue: 30000000, totalCost: 3000000, artistShare: 60, artistAmount: 16200000, companyAmount: 10800000, tax: 1620000, netAmount: 14580000, status: "paid", paidDate: "2025-10-05" },
  { id: 6, artistId: 6, month: "2025-09", totalRevenue: 120000000, totalCost: 12000000, artistShare: 55, artistAmount: 59400000, companyAmount: 48600000, tax: 5940000, netAmount: 53460000, status: "pending", paidDate: null }
];

// 公司财务概览
const companyOverview = {
  totalArtists: 6,
  activeArtists: 6,
  monthlyRevenue: 2610000000,
  monthlyCost: 475000000,
  monthlyProfit: 2135000000,
  pendingSettlements: 2,
  upcomingActivities: 3
};

// 格式化金额（韩元）
function formatKRW(amount) {
  if (amount >= 100000000) {
    return "₩" + (amount / 100000000).toFixed(1) + "억";
  } else if (amount >= 10000) {
    return "₩" + (amount / 10000).toFixed(0) + "만";
  }
  return "₩" + amount.toLocaleString();
}

// 格式化日期
function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" });
}

// 获取艺人活动
function getArtistActivities(artistId) {
  return activities.filter(a => a.artistId === artistId);
}

// 获取艺人结算
function getArtistSettlements(artistId) {
  return settlements.filter(s => s.artistId === artistId);
}

// 计算艺人本月净收入
function getArtistNetRevenue(artistId) {
  const artistActivities = getArtistActivities(artistId);
  return artistActivities.reduce((sum, a) => sum + (a.revenue - a.cost), 0);
}
