const siteConfig = {
  siteName: "STARSETTLE",
  siteNameKr: "스타세틀",
  tagline: "艺人结算管理系统",
  taglineKr: "아티스트 정산 관리 시스템",
  version: "v2.0",
  company: "YG Entertainment",
  currency: "KRW",
  fiscalYear: 2025,
  
  navItems: [
    { id: "dashboard", label: "대시보드", labelEn: "Dashboard", icon: "📊" },
    { id: "artists", label: "아티스트", labelEn: "Artists", icon: "🎤" },
    { id: "activities", label: "활동", labelEn: "Activities", icon: "🎬" },
    { id: "settlements", label: "정산", labelEn: "Settlements", icon: "💰" },
    { id: "reports", label: "리포트", labelEn: "Reports", icon: "📈" }
  ],
  
  stats: [
    { key: "totalArtists", label: "소속 아티스트", labelEn: "Total Artists", icon: "🎤" },
    { key: "monthlyRevenue", label: "월간 매출", labelEn: "Monthly Revenue", icon: "💵" },
    { key: "monthlyProfit", label: "월간 순이익", labelEn: "Monthly Profit", icon: "📈" },
    { key: "pendingSettlements", label: "대기 정산", labelEn: "Pending", icon: "⏳" }
  ],
  
  activityTypes: {
    "演唱会": { icon: "🎤", color: "#8B5CF6" },
    "广告代言": { icon: "📺", color: "#F59E0B" },
    "综艺": { icon: "🎬", color: "#10B981" },
    "电视剧": { icon: "📺", color: "#EF4444" },
    "Solo专辑": { icon: "💿", color: "#EC4899" },
    "粉丝见面会": { icon: "💝", color: "#F472B6" },
    "时尚活动": { icon: "👗", color: "#6366F1" }
  },
  
  settlementStatus: {
    paid: { label: "지급완료", labelEn: "Paid", color: "#10B981", bgColor: "#D1FAE5" },
    pending: { label: "대기중", labelEn: "Pending", color: "#F59E0B", bgColor: "#FEF3C7" },
    processing: { label: "처리중", labelEn: "Processing", color: "#3B82F6", bgColor: "#DBEAFE" }
  }
};
