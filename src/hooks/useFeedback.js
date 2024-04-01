import { toast } from "react-toastify";

/* This hook is used as a feedback tool and it leverages a toast component.
*  The toast is placed at the top-right corner and can be closed manually.
*/

const useFeedback = () => {
  /* Basic toast
  *  Parameters:
  *  - message: a string that will be displayed (\n is supported)
  *  - duration: a number that dictates how long the toast should appear
  *    (in milliseconds, usually 3000 is fine)
  *  - mode: a string that sets the tone of the toast (with a fitting icon).
  *    Has to be exact! Options are:
  *   > success (green)
  *   > error (bright red)
  *   > info (blue)
  *   > warning (yellow)
  *   > !leaving it empty! (purple)
  */
  const give = (message, duration, mode="") => {
    if(mode){
      toast[mode](message, {
        autoClose: duration,
        theme: "colored"
      });
    } else {
      toast(`${message}`, {
        autoClose: duration,
        theme: "dark"
      });
    }
  };

  // check this for detailed version: https://fkhadra.github.io/react-toastify/promise
  /* Promise appropriate toast
  *  This version has 2 stages with 2 possible outcomes: loading -> success/error
  *  Needs a Promise object though so only use it for longer loadings -> else 2 basic toasts
  *  Parameters:
  *  - Promise
  *  - case handling as object, e.g.
  *    {pending: {render(){return "Loading"}},
  *     success: {render(){return "Success"}},
  *     error: {render(){return "Failed"}}
  *    }
  */
  const distinct = (promise, handling) => {
    toast.promise(promise, handling);
  };

  return { give, distinct };
};

export default useFeedback;
