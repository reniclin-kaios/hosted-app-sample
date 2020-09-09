'use strict';

(function () {
  //
  // Tab element and functions
  //
  var hostedTab, packageTab, hostedPage, packagePage, hostedActivities, packageActivities, currentPage = 'hostedPage', hostedIdx = 0, packageIdx = 0;

  hostedTab = document.querySelector('#hostedTab');
  packageTab = document.querySelector('#packageTab');
  hostedPage = document.querySelector('#hostedPage');
  packagePage = document.querySelector('#packagePage');
  hostedActivities = document.querySelectorAll('[hosted-activity]');
  packageActivities = document.querySelectorAll('[package-activity]');

  if (hostedTab) {
    hostedTab.onclick = function (event) {
      console.log('hostedTab click');

      currentPage = 'hostedPage'
      hostedTab.className = 'active';
      if (packageTab) {
        packageTab.className = '';
      }

      if (packagePage) {
        packagePage.style.display = 'none';
      }
      if (hostedPage) {
        hostedPage.style.display = 'block';
      }

      if (hostedActivities && hostedActivities.length && hostedActivities.length > 0) {
        if (hostedIdx >= hostedActivities.length) {
          hostedIdx = 0;
        }
        hostedActivities[hostedIdx].setAttribute("nav-selected", "true");
        hostedActivities[hostedIdx].focus();
      }
    }
    hostedTab.click();
  }

  if (packageTab) {
    packageTab.onclick = function (event) {
      console.log('packageTab click');

      currentPage = 'packagePage'
      packageTab.className = 'active';
      if (hostedTab) {
        hostedTab.className = '';
      }

      if (hostedPage) {
        hostedPage.style.display = 'none';
      }
      if (packagePage) {
        packagePage.style.display = 'block';
      }

      if (packageActivities && typeof packageActivities.length === 'number' && packageActivities.length > 0) {
        if (packageIdx >= packageActivities.length) {
          packageIdx = 0;
        }
        packageActivities[packageIdx].setAttribute("nav-selected", "true");
        packageActivities[packageIdx].focus();
      }
    }
  }

  //
  // Navigations
  //
  function getNextActivityIdx(currentIdx, next, length) {
    return currentIdx + next < 0 ? 0 : currentIdx + next >= length ? length - 1 : currentIdx + next;
  }

  function onArrowUporDown(isArrowUp) {
    if (currentPage === 'hostedPage' && hostedActivities && typeof hostedActivities.length === 'number' && hostedActivities.length > 0) {
      let nextHostedIdx = getNextActivityIdx(hostedIdx, isArrowUp ? - 1 : + 1, hostedActivities.length)
      if (nextHostedIdx !== hostedIdx) {
        hostedActivities[hostedIdx].setAttribute("nav-selected", "false");
        hostedActivities[hostedIdx].blur();
        hostedActivities[nextHostedIdx].setAttribute("nav-selected", "true");
        hostedActivities[nextHostedIdx].focus();

        hostedIdx = nextHostedIdx;
      }

    } else if (currentPage === 'packagePage' && packageActivities && typeof packageActivities.length === 'number' && packageActivities.length > 0) {
      let nextPackageIdx = getNextActivityIdx(packageIdx, isArrowUp ? - 1 : + 1, packageActivities.length)
      if (nextPackageIdx !== packageIdx) {
        packageActivities[packageIdx].setAttribute("nav-selected", "false");
        packageActivities[packageIdx].blur();
        packageActivities[nextPackageIdx].setAttribute("nav-selected", "true");
        packageActivities[nextPackageIdx].focus();

        packageIdx = nextPackageIdx
      }
    }
  }

  //
  // Event Listener
  //
  document.addEventListener('keydown', function (event) {
    switch (event.key) {
      case 'Enter':
        console.log('key: Enter');
        break;
      case "ArrowDown":
        console.log('key: ArrowDown');
        onArrowUporDown(false);
        break;
      case "ArrowUp":
        console.log('key: ArrowUp');
        onArrowUporDown(true);
        break;
      case "ArrowLeft":
        console.log('key: ArrowLeft');
        if (hostedTab) {
          hostedTab.click();
        }
        break;
      case "ArrowRight":
        console.log('key: ArrowRight');
        if (packageTab) {
          packageTab.click();
        }
        break;
      default:
        return
    }
  });

  //
  // Navigations
  //
})();
