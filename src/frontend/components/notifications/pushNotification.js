/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */

// export const pushNotification = (data, callback) => {
export const pushNotification = (data) => {
  const notification = document.createElement('div');
  notification.classList.add('notif');
  // notification.classList.add('border-success');

  if (data.icon) {
    notification.innerHTML += `<i class="icon ion-md-${data.icon} icon-${data.type}"></i>`;
  } else {
    notification.classList.add('without-icon');
  }

  // Add the text to the div
  notification.innerHTML += `<span class="pl-2">${data.text}</span>`;

  // X to close
  // <button type="button" className="close" aria-label="Close" onclick="dismissNotification()"><span aria-hidden="true">&times;</span></button>

  if (data.close) {
    notification.innerHTML +=
      '<button type="button" class="close" aria-label="Close" onclick="dismissNotification()"><span aria-hidden="true">&times;</span></button>';
  }

  //check how many notifications are already present
  const notifs = document.querySelectorAll('.notif');

  const currentNotif = document.querySelector('.notif-front');
  const middleNotif = document.querySelector('.notif-middle');
  const lastNotif = document.querySelector('.notif-last');

  currentNotif ?
    currentNotif.classList.replace('notif-front', 'notif-middle') :
    '';
  middleNotif ?
    middleNotif.classList.replace('notif-middle', 'notif-last') :
    '';
  lastNotif ? lastNotif.classList.replace('notif-last', 'notif-out') : '';

  document.body.appendChild(notification);

  setTimeout(function () {
    notification.classList.add('notif-front');
    // callback();
  }, 200);
};

// export const dismissNotification = () => {
//   const currentNotif = document.querySelector('.notif-front');
//   const middleNotif = document.querySelector('.notif-middle');
//   const lastNotif = document.querySelector('.notif-last');

//   const notifOut = document.querySelectorAll('.notif-out');

//   if (currentNotif) {
//     currentNotif.classList.replace('notif-front', 'notification');
//     //Remove it after animating
//     setTimeout(() => {
//       currentNotif.remove();
//     }, 300);
//   }
// }
