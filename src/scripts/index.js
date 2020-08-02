import '../styles/index.scss'
import data from '../scan.json'
import functions from './functions'

function init(data) {
  const { displayName, email, notifications } = data.user
  const {
    assets,
    dateCompleted,
    name,
    scanners,
    severityCounts,
    status,
    vulnerabilities,
  } = data.scan

  functions.welcomeMsg(displayName)
  functions.notificationText(notifications)
  functions.appendAssets(assets)
  functions.appendVulnerabilitiesCount(vulnerabilities)
  functions.appendVulnerabilities(vulnerabilities, assets)
  functions.appendScanSummary(
    name,
    dateCompleted,
    status,
    scanners,
    severityCounts
  )
  functions.appendUserInfo(displayName, email)
  functions.appendNotifications(notifications)
}

// Toggle theme
const toggleBtn = document.querySelector('.toggle-btn')
toggleBtn.addEventListener('click', () => {
  const body = document.querySelector('body')
  if (body.classList.contains('light')) {
    body.classList.remove('light')
    body.classList.add('dark')
    toggleBtn.innerText = 'Light Mode'
  } else {
    body.classList.add('light')
    body.classList.remove('dark')
    toggleBtn.innerText = 'Dark Mode'
  }
})

init(data)
