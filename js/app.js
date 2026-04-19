// STARSETTLE - Main Application
// Artist Settlement Management System

// Global State
let currentPage = 'dashboard';
let currentTab = 'all';

// Initialize
function init() {
  renderStats();
  renderDashboardArtists();
  renderDashboardSettlements();
  renderArtistsGrid();
  renderActivitiesTable();
  renderSettlementsList();
  setupNavigation();
  setupTabs();
  setupSearch();
}

// Navigation
function setupNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const page = item.dataset.page;
      showPage(page);
      
      navItems.forEach(n => n.classList.remove('active'));
      item.classList.add('active');
    });
  });
}

function showPage(page) {
  currentPage = page;
  
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  
  // Show target page
  const targetPage = document.getElementById(page + '-page');
  if (targetPage) {
    targetPage.classList.add('active');
  }
  
  // Update header
  const pageNames = {
    dashboard: { title: '대시보드', subtitle: '아티스트 정산 현황 개요' },
    artists: { title: '아티스트', subtitle: '소속 아티스트 관리' },
    activities: { title: '활동', subtitle: '활동 일정 및 수익 관리' },
    settlements: { title: '정산', subtitle: '월간 정산 내역 관리' },
    reports: { title: '리포트', subtitle: '매출 분석 및 통계' }
  };
  
  const info = pageNames[page] || pageNames.dashboard;
  document.getElementById('page-title').textContent = info.title;
  document.getElementById('page-subtitle').textContent = info.subtitle;
}

// Tabs
function setupTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;
      currentTab = tab;
      
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      document.getElementById('tab-' + tab)?.classList.add('active');
      
      renderActivitiesTable();
    });
  });
}

// Search
function setupSearch() {
  const searchInput = document.getElementById('search-input');
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    filterContent(query);
  });
}

function filterContent(query) {
  // Filter artists table
  const artistRows = document.querySelectorAll('#dashboard-artists-table tbody tr');
  artistRows.forEach(row => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(query) ? '' : 'none';
  });
  
  // Filter activities table
  const activityRows = document.querySelectorAll('#activities-table tbody tr');
  activityRows.forEach(row => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(query) ? '' : 'none';
  });
  
  // Filter settlements
  const settlementCards = document.querySelectorAll('.settlement-card');
  settlementCards.forEach(card => {
    const text = card.textContent.toLowerCase();
    card.style.display = text.includes(query) ? '' : 'none';
  });
}

// Render Stats
function renderStats() {
  const statsGrid = document.getElementById('stats-grid');
  if (!statsGrid) return;
  
  const stats = [
    { 
      label: '소속 아티스트', 
      value: companyOverview.totalArtists + '명', 
      icon: '🎤',
      change: '+0',
      changeType: 'up'
    },
    { 
      label: '월간 매출', 
      value: formatKRW(companyOverview.monthlyRevenue), 
      icon: '💵',
      change: '+12.5%',
      changeType: 'up'
    },
    { 
      label: '월간 순이익', 
      value: formatKRW(companyOverview.monthlyProfit), 
      icon: '📈',
      change: '+8.3%',
      changeType: 'up'
    },
    { 
      label: '대기 정산', 
      value: companyOverview.pendingSettlements + '건', 
      icon: '⏳',
      change: '2건',
      changeType: 'down'
    }
  ];
  
  statsGrid.innerHTML = stats.map((stat, i) => `
    <div class="stat-card fade-in" style="animation-delay: ${i * 0.1}s">
      <div class="stat-header">
        <span>${stat.label}</span>
        <div class="stat-icon">${stat.icon}</div>
      </div>
      <div class="stat-value">${stat.value}</div>
      <div class="stat-change ${stat.changeType}">
        ${stat.changeType === 'up' ? '↑' : '↓'} ${stat.change}
      </div>
    </div>
  `).join('');
}

// Render Dashboard Artists Table
function renderDashboardArtists() {
  const tbody = document.querySelector('#dashboard-artists-table tbody');
  if (!tbody) return;
  
  tbody.innerHTML = artists.map(artist => {
    const netRevenue = getArtistNetRevenue(artist.id);
    return `
      <tr>
        <td>
          <div class="artist-cell">
            <div class="artist-avatar">${artist.avatar}</div>
            <div class="artist-info">
              <h4>${artist.stageName}</h4>
              <p>${artist.name}</p>
            </div>
          </div>
        </td>
        <td>${artist.group}</td>
        <td>${artist.activities}건</td>
        <td class="revenue revenue-positive">${formatKRW(netRevenue)}</td>
        <td>${artist.revenueShare}%</td>
        <td><span class="status-badge status-paid">활동중</span></td>
      </tr>
    `;
  }).join('');
}

// Render Dashboard Settlements
function renderDashboardSettlements() {
  const tbody = document.querySelector('#dashboard-settlements-table tbody');
  if (!tbody) return;
  
  tbody.innerHTML = settlements.map(s => {
    const artist = artists.find(a => a.id === s.artistId);
    const status = siteConfig.settlementStatus[s.status];
    return `
      <tr>
        <td>
          <div class="artist-cell">
            <div class="artist-avatar">${artist?.avatar || '👤'}</div>
            <div class="artist-info">
              <h4>${artist?.stageName || 'Unknown'}</h4>
            </div>
          </div>
        </td>
        <td>${s.month}</td>
        <td class="revenue">${formatKRW(s.totalRevenue)}</td>
        <td class="revenue revenue-positive">${formatKRW(s.artistAmount)}</td>
        <td class="revenue revenue-negative">-${formatKRW(s.tax)}</td>
        <td class="revenue revenue-positive" style="font-weight:700">${formatKRW(s.netAmount)}</td>
        <td><span class="status-badge ${s.status === 'paid' ? 'status-paid' : 'status-pending'}">${status?.label || s.status}</span></td>
      </tr>
    `;
  }).join('');
}

// Render Artists Grid
function renderArtistsGrid() {
  const grid = document.getElementById('artists-grid');
  if (!grid) return;
  
  grid.innerHTML = artists.map((artist, i) => {
    const netRevenue = getArtistNetRevenue(artist.id);
    const artistActivities = getArtistActivities(artist.id);
    const completedActivities = artistActivities.filter(a => a.status === 'completed').length;
    
    return `
      <div class="artist-card fade-in" style="animation-delay: ${i * 0.1}s" onclick="showArtistDetail(${artist.id})">
        <div class="artist-card-header">
          <div class="artist-card-avatar">${artist.avatar}</div>
          <div class="artist-card-info">
            <h3>${artist.stageName}</h3>
            <p>${artist.name} · ${artist.group}</p>
          </div>
        </div>
        <div class="artist-card-stats">
          <div class="artist-card-stat">
            <span>월간 매출</span>
            <strong style="color: var(--success)">${formatKRW(netRevenue)}</strong>
          </div>
          <div class="artist-card-stat">
            <span>활동</span>
            <strong>${completedActivities}/${artistActivities.length}건</strong>
          </div>
          <div class="artist-card-stat">
            <span>데뷔</span>
            <strong>${artist.debutDate}</strong>
          </div>
          <div class="artist-card-stat">
            <span>계약</span>
            <strong>${artist.contractType}</strong>
          </div>
        </div>
        <div class="artist-card-footer">
          <span class="share-badge">분배율 ${artist.revenueShare}%</span>
          <span class="status-badge status-paid">활동중</span>
        </div>
      </div>
    `;
  }).join('');
}

// Render Activities Table
function renderActivitiesTable() {
  const tbody = document.querySelector('#activities-table tbody');
  if (!tbody) return;
  
  let filteredActivities = activities;
  if (currentTab === 'completed') {
    filteredActivities = activities.filter(a => a.status === 'completed');
  } else if (currentTab === 'scheduled') {
    filteredActivities = activities.filter(a => a.status === 'scheduled');
  }
  
  tbody.innerHTML = filteredActivities.map(activity => {
    const artist = artists.find(a => a.id === activity.artistId);
    const typeInfo = siteConfig.activityTypes[activity.type] || { icon: '📋', color: '#6B7280' };
    const netProfit = activity.revenue - activity.cost;
    
    return `
      <tr>
        <td><strong>${activity.name}</strong></td>
        <td>
          <div class="artist-cell">
            <div class="artist-avatar" style="width:32px;height:32px;font-size:14px">${artist?.avatar || '👤'}</div>
            <span>${artist?.stageName || 'Unknown'}</span>
          </div>
        </td>
        <td>
          <span class="type-badge">
            <span style="color: ${typeInfo.color}">${typeInfo.icon}</span>
            ${activity.type}
          </span>
        </td>
        <td>${activity.date}</td>
        <td class="revenue revenue-positive">${formatKRW(activity.revenue)}</td>
        <td class="revenue revenue-negative">-${formatKRW(activity.cost)}</td>
        <td class="revenue" style="color: ${netProfit > 0 ? 'var(--success)' : 'var(--danger)'}; font-weight: 600">
          ${netProfit > 0 ? '+' : ''}${formatKRW(netProfit)}
        </td>
        <td>
          <span class="status-badge ${activity.status === 'completed' ? 'status-paid' : 'status-pending'}">
            ${activity.status === 'completed' ? '완료' : '예정'}
          </span>
        </td>
      </tr>
    `;
  }).join('');
}

// Render Settlements List
function renderSettlementsList() {
  const container = document.getElementById('settlements-list');
  if (!container) return;
  
  container.innerHTML = settlements.map((s, i) => {
    const artist = artists.find(a => a.id === s.artistId);
    const status = siteConfig.settlementStatus[s.status];
    
    return `
      <div class="settlement-card fade-in" style="animation-delay: ${i * 0.1}s">
        <div class="settlement-header">
          <div class="settlement-title">
            <div class="artist-avatar">${artist?.avatar || '👤'}</div>
            <div>
              <h3>${artist?.stageName || 'Unknown'} · ${s.month} 정산</h3>
              <p style="font-size: 12px; color: var(--text-muted); margin-top: 2px">분배율 ${s.artistShare}% · ${status?.label || s.status}</p>
            </div>
          </div>
          <span class="status-badge ${s.status === 'paid' ? 'status-paid' : 'status-pending'}">${status?.label || s.status}</span>
        </div>
        
        <div class="settlement-details">
          <div class="settlement-detail">
            <span>총 매출</span>
            <strong style="color: var(--text-primary)">${formatKRW(s.totalRevenue)}</strong>
          </div>
          <div class="settlement-detail">
            <span>총 비용</span>
            <strong style="color: var(--danger)">-${formatKRW(s.totalCost)}</strong>
          </div>
          <div class="settlement-detail">
            <span>아티스트 분</span>
            <strong style="color: var(--success)">${formatKRW(s.artistAmount)}</strong>
          </div>
          <div class="settlement-detail">
            <span>회사 분</span>
            <strong style="color: var(--info)">${formatKRW(s.companyAmount)}</strong>
          </div>
        </div>
        
        <div class="settlement-breakdown">
          <div class="breakdown-row">
            <span>총 매출</span>
            <strong>${formatKRW(s.totalRevenue)}</strong>
          </div>
          <div class="breakdown-row">
            <span>총 비용 (공제)</span>
            <strong style="color: var(--danger)">-${formatKRW(s.totalCost)}</strong>
          </div>
          <div class="breakdown-row">
            <span>순이익</span>
            <strong>${formatKRW(s.totalRevenue - s.totalCost)}</strong>
          </div>
          <div class="breakdown-row">
            <span>아티스트 분 (${s.artistShare}%)</span>
            <strong style="color: var(--success)">${formatKRW(s.artistAmount)}</strong>
          </div>
          <div class="breakdown-row">
            <span>소득세 (10%)</span>
            <strong style="color: var(--danger)">-${formatKRW(s.tax)}</strong>
          </div>
          <div class="breakdown-row total">
            <span>실지급액</span>
            <strong>${formatKRW(s.netAmount)}</strong>
          </div>
        </div>
        
        ${s.status === 'pending' ? `
          <div style="margin-top: 16px; display: flex; gap: 8px; justify-content: flex-end">
            <button class="btn btn-secondary btn-sm" onclick="event.stopPropagation()">수정</button>
            <button class="btn btn-primary btn-sm" onclick="event.stopPropagation(); markAsPaid(${s.id})">지급완료 처리</button>
          </div>
        ` : `
          <div style="margin-top: 16px; text-align: right; font-size: 12px; color: var(--text-muted)">
            지급일: ${s.paidDate}
          </div>
        `}
      </div>
    `;
  }).join('');
}

// Show Artist Detail Modal
function showArtistDetail(artistId) {
  const artist = artists.find(a => a.id === artistId);
  if (!artist) return;
  
  const artistActivities = getArtistActivities(artistId);
  const artistSettlements = getArtistSettlements(artistId);
  const netRevenue = getArtistNetRevenue(artistId);
  
  const modalBody = document.getElementById('modal-body');
  modalBody.innerHTML = `
    <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 24px">
      <div class="artist-card-avatar" style="width: 64px; height: 64px; font-size: 32px">${artist.avatar}</div>
      <div>
        <h2 style="font-size: 20px; margin-bottom: 4px">${artist.stageName}</h2>
        <p style="color: var(--text-muted)">${artist.name} · ${artist.group} · 데뷔 ${artist.debutDate}</p>
      </div>
    </div>
    
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 24px">
      <div class="artist-card-stat">
        <span>월간 매출</span>
        <strong style="color: var(--success)">${formatKRW(netRevenue)}</strong>
      </div>
      <div class="artist-card-stat">
        <span>분배율</span>
        <strong>${artist.revenueShare}%</strong>
      </div>
      <div class="artist-card-stat">
        <span>활동 수</span>
        <strong>${artistActivities.length}건</strong>
      </div>
    </div>
    
    <h4 style="margin-bottom: 12px; font-size: 14px">최근 활동</h4>
    <div style="max-height: 200px; overflow-y: auto">
      ${artistActivities.slice(0, 5).map(a => `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid var(--border)">
          <div>
            <strong style="font-size: 13px">${a.name}</strong>
            <p style="font-size: 11px; color: var(--text-muted); margin-top: 2px">${a.type} · ${a.date}</p>
          </div>
          <span class="revenue revenue-positive">${formatKRW(a.revenue - a.cost)}</span>
        </div>
      `).join('')}
    </div>
    
    <h4 style="margin: 20px 0 12px; font-size: 14px">정산 내역</h4>
    <div>
      ${artistSettlements.map(s => `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid var(--border)">
          <div>
            <strong style="font-size: 13px">${s.month}</strong>
            <p style="font-size: 11px; color: var(--text-muted); margin-top: 2px">${s.status === 'paid' ? '지급완료' : '대기중'}</p>
          </div>
          <span class="revenue" style="color: ${s.status === 'paid' ? 'var(--success)' : 'var(--accent)'}; font-weight: 600">
            ${formatKRW(s.netAmount)}
          </span>
        </div>
      `).join('')}
    </div>
  `;
  
  document.getElementById('modal-title').textContent = artist.stageName + ' 상세 정보';
  document.getElementById('modal').classList.add('active');
}

// Mark Settlement as Paid
function markAsPaid(settlementId) {
  const settlement = settlements.find(s => s.id === settlementId);
  if (settlement) {
    settlement.status = 'paid';
    settlement.paidDate = new Date().toISOString().split('T')[0];
    renderSettlementsList();
    renderDashboardSettlements();
    renderStats();
    
    // Show notification
    showNotification('정산이 지급완료 처리되었습니다.');
  }
}

// Close Modal
function closeModal() {
  document.getElementById('modal').classList.remove('active');
}

// Notification
function showNotification(message) {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--success);
    color: white;
    padding: 14px 24px;
    border-radius: var(--radius-md);
    font-size: 14px;
    font-weight: 500;
    z-index: 9999;
    animation: slideIn 0.3s ease;
  `;
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Close modal on overlay click
document.getElementById('modal')?.addEventListener('click', (e) => {
  if (e.target.id === 'modal') closeModal();
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// Add animation styles
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
`;
document.head.appendChild(style);

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
