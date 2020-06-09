import Toast from 'react-native-root-toast';
const K_MILLISECONDS = 1000;

/******************************* Intake Toast Defintion *******************************/
const IntakeToast = (function () {
  const INIT_TOAST_POS = -100;
  const TOAST_OPACTIY = 0.9;
  const TOAST_DURATION = Toast.durations.LONG; //Duration in ms

  let iToast: any = null;

  return {
    _displayToast: (
      message: string,
      duration = TOAST_DURATION,
      overlapping = false //use overlapping when you wan't one toast to overlap over itself
    ) => {
      if (iToast != null && !overlapping) {
        hideToastIfVisible();
      }
      iToast = Toast.show(message, {
        position: INIT_TOAST_POS,
        duration: duration,
        shadow: false,
        animation: true,
        hideOnPress: true,
        delay: 0,
        opacity: TOAST_OPACTIY,
        keyboardAvoiding: true,
      });
    },

    _hideToast: () => {
      if (iToast != null) {
        Toast.hide(iToast);
        iToast = null;
      }
    },
  };
})();

/**
 * Hides Toast, if Toast is Visible
 */
export const hideToastIfVisible = () => {
  IntakeToast._hideToast();
};
/******************************* Public Alert Methods *******************************/

export const showShortToast = (message: string) => {
  IntakeToast._displayToast(message);
};

export const showLongToast = (message: string) => {
  const duration = 15 * K_MILLISECONDS;
  IntakeToast._displayToast(message, duration);
};

export const showVeryShortToast = (message: string) => {
  const duration = 0.5 * K_MILLISECONDS;
  IntakeToast._displayToast(message, duration, true);
};

export const showToast = (message: string) => {
  /* If message length is greater than 80 character then show long toast 
	else show short toast */
  if (message.length > 80) {
    showLongToast(message);
  } else {
    showShortToast(message);
  }
};
