function validate(testStr, name) {

  $('label[name='+name+']').remove();

  if (testStr == "") {
    displayError("Field required.", name);
    return false;
  }
  switch (name) {
      case 'emailaddress':
        var email = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        if (!email.test(testStr)) {
          displayError("Please enter a valid email.", name);
          return false;
        }

        $('input[name='+name+']').css({
          "border-color": "#3b3b3b"
        });
        return true;

      case 'password':
        if(testStr.length <= 5){
          displayError("Password does not meet minimum length of 6 characters.", name);
          return false;
        } else if (!/\d/.test(testStr)) {
          displayError("Password does not contain at least one number.", name);
          return false;
        }
        $('input[name='+name+']').css({
          "border-color": "#3b3b3b"
        });
        return true;

      case 'dob':
        var today = new Date();
        var inputDate = new Date(testStr);
        if (inputDate > today){
          displayError("Date of Birth must be before today.", name);
          return false;
        }
        $('input[name='+name+']').css({
          "border-color": "#3b3b3b"
        });
        return true;

      case 'mobilephone':
        testStr = testStr.replace(/\s/g, '');
        if (testStr.substring(0, 3) == '+61') {
          testStr = testStr.replace('+61', '0');
        }

        if (testStr.substring(0,2) != "04") {
          displayError("Please enter an Australian mobile number", name);
          return false;
        } else if (testStr.length == 10) {
          if(!/^[0-9]+$/.test(testStr)){
            displayError("Mobile number contains invalid characters.", name);
            return false;
          }
        } else {
          displayError("Please enter the correct number of digits.", name);
          return false;
        }
        $('input[name='+name+']').css({
          "border-color": "#3b3b3b"
        });
        return true;

      case 'webpage':
        var url = /^(?:http(s)?:\/\/)?[w]{3}(?:\.[\w\.-]+){2,}[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm;
        if(!url.test(testStr)){
          displayError("Please enter a valid URL. e.g www.google.com", name)
          return false;
        }
        $('input[name='+name+']').css({
          "border-color": "#3b3b3b"
        });
        return true;

      default:
        console.log("somethings wrong");
    }
}

function displayError(errorStr, inputName){
  $('input[name='+inputName+']').css({
    "border-color": "red"
  });
  $('input[name='+inputName+']').after(
    $("<label class=error name="+inputName+"></label>").text(errorStr)
  );

  position = $('input[name='+inputName+']').position();
  $("label[name="+inputName+"]").css({
    "top": position.top + 3
  });

  $('input[name='+inputName+']').focus();

}

