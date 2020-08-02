const moment = require('moment')

const functions = {
  // Personalised welcome message
  welcomeMsg(name) {
    const welcomeMsg = document.getElementById('welcome')
    const firstName = name.split(' ').slice(0, -1)
    welcomeMsg.innerHTML = `Hi ${firstName}, here's your dashboard`
  },
  // Notification text
  notificationText(notifications) {
    const notificationText = document.getElementById('notification-text')
    notificationText.innerHTML = `<p>You have <span class="notifications__bubble">${notifications.length}</span> notifications</p>`
  },
  // Append user's information to sidebar
  appendUserInfo(name, email) {
    const user = document.getElementById('user')
    const userTemplate = `
        <p><strong>Your Details:</strong></p>
        <br>
        <p class="user__name"><i class="far fa-user"></i> ${name}</p>
        <p class="user__email"><i class="far fa-envelope"></i> ${email}</p>
        `
    user.innerHTML = userTemplate
  },
  appendNotifications(notifications) {
    // Append notifications to DOM
    const notificationsContainer = document.getElementById('notifications')
    const notificationsTemplate = notifications
      .map((notification) => {
        if (notification.read) {
          return `<li class="notifications__item read"><p class="notifications__date">${moment(
            notification.date
          ).fromNow()}</p><p>${notification.message}</p></li>`
        } else {
          return `<li class="notifications__item"><p class="notifications__date">${moment(
            notification.date
          ).fromNow()}</p><p>${notification.message}</p></li>`
        }
      })
      .join('')
    notificationsContainer.innerHTML = notificationsTemplate

    // Toggle notifications
    const notificationsWrapper = document.querySelector(
      '.notifications__wrapper'
    )
    notificationsWrapper.addEventListener('click', (e) => {
      if (e.target.classList.contains('notifications__bubble')) {
        notificationsContainer.classList.contains('active')
          ? notificationsContainer.classList.remove('active')
          : notificationsContainer.classList.add('active')
      }
    })

    // Close notifications if user clicks outside of container
    document.addEventListener('click', function (e) {
      const clickInside = notificationsContainer.contains(e.target)
      if (
        !clickInside &&
        !e.target.classList.contains('notifications__bubble')
      ) {
        notificationsContainer.classList.remove('active')
      }
    })
  },
  // Append scan information to DOM
  appendScanSummary(name, dateCompleted, status, scanners, severityCounts) {
    const scanSummary = document.getElementById('scan-summary')
    const scanSummaryTemplate = `
      <p class="scan-summary__title">${name}</p>
      <br>
      <p class="scan-summary__date"><span class="scan-summary__subtitle">Completed:</span> ${moment(
        dateCompleted
      ).format('MMM Do YYYY, h:mma')}</p>
      <p class="scan-summary__status"><span class="scan-summary__subtitle">Status:</span> ${status}</p>
      <br>
      <ul class="scan-summary__scanners">
      <p class="scan-summary__subtitle">Scanners:</p>
        ${scanners
          .map((scanner) => {
            return `<li class="scan-summary__scanners-item"><i class="far fa-dot-circle"></i> ${scanner}</li>`
          })
          .join('')}
      </ul>
      <br>
      <p class="scan-summary__subtitle">Severity Counts</p>
      <p class="scan-summary__severity-count">Critical: ${
        severityCounts.critical
      }</p>
      <p class="scan-summary__severity-count">High: ${severityCounts.high}</p>
      <p class="scan-summary__severity-count">Medium: ${
        severityCounts.medium
      }</p>
      <p class="scan-summary__severity-count">Low: ${severityCounts.low}</p>
      <p class="scan-summary__severity-count">Information: ${
        severityCounts.information
      }</p>
    `
    scanSummary.innerHTML = scanSummaryTemplate
  },
  // Append vulnerabilities count
  appendVulnerabilitiesCount(vulnerabilities) {
    const vulnerabilitiesCount = document.getElementById(
      'vulnerabilities-count'
    )
    vulnerabilitiesCount.innerHTML = `${vulnerabilities.length}`
  },
  // Append vulnerabilities to DOM
  appendVulnerabilities(vulnerabilities, assets) {
    const vulnerabilitiesContainer = document.getElementById('vulnerabilities')
    const vulnerabilitiesTemplate = vulnerabilities
      .map((vulnerability) => {
        return `
        <div class="vulnerabilities__item ${vulnerability.severity}">
        <span class="vulnerabilities__severity">${vulnerability.severity}</span>
        <p class="vulnerabilities__name">${vulnerability.name}</p>
        <p class="vulnerabilities__id">ID: ${vulnerability.id}</p>
        <p class="vulnerabilities__score">CVSS Score: ${
          vulnerability.cvssBaseScore
        }</p>
        <p class="vulnerabilities__subtitle">Description</p>
        <p class="vulnerabilities__text">${vulnerability.description}</p>
        ${
          vulnerability.solution
            ? `
            <p class="vulnerabilities__subtitle">Solution</p>
        <p class="vulnerabilities__text">${vulnerability.solution}</p>`
            : ''
        }
        ${
          vulnerability.references
            ? `
        <p class="vulnerabilities__subtitle">References</p>
        <p class="vulnerabilities__text">${vulnerability.references}</p>
        `
            : ''
        }
        <p class="vulnerabilities__subtitle">Affected Assets</p>
        ${vulnerability.affectedAssets
          .map((asset) => {
            const filtered = []
            for (let i = 0; i < assets.length; i++) {
              if (assets[i].id === asset) {
                filtered.push(assets[i])
              }
            }
            return `<div class="vulnerabilities__asset-wrapper"><div class="vulnerabilities__asset">${filtered[0].name}</div><div class="vulnerabilities__asset-summary"><p>Asset Name: ${filtered[0].name}</p><p>Description: ${filtered[0].description}</p>
            <p>Scan Count: ${filtered[0].scanCount}</p></div></div>`
          })
          .join('')}
        </div>
      `
      })
      .join('')
    vulnerabilitiesContainer.innerHTML = vulnerabilitiesTemplate
  },
  // Append assets to DOM
  appendAssets(assets) {
    const assetsContainer = document.getElementById('assets')
    assetsContainer.innerHTML = assets
      .map((asset) => {
        return `
        <div class="assets__item">
          <span class="assets__id">ID: ${asset.id}</span>
          <p class="assets__item-text">Asset Name: <span>${
            asset.name
          }</span></p>
          <p class="assets__item-text">Description: <span>${
            asset.description
          }</span></p>
          <p class="assets__item-text">Created: <span>${moment(
            asset.created
          ).format('MMM Do YYYY, h:mma')}</span></p>
          <p class="assets__item-text">Scan Count: <span>${
            asset.scanCount
          }</span></p>
        </div>
        `
      })
      .join('')
  },
}

module.exports = functions
