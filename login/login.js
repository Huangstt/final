$(document).ready(() => {
  // 產生驗證碼
  $("#verificationCode").text(generateVerificationCode());

  // 綁定重新產生圖示->呼叫方法重新產生驗證碼
  $("#regenerateCode").on("click", () => {
    let code = generateVerificationCode();
    // alert(code);
    $("#verificationCode").text(code);
  });
  // 重新產生驗證碼 方法
  function generateVerificationCode() {
    let code = "";
    for (let i = 0; i < 5; i++) {
      num = Math.floor(Math.random() * 10);
      code += num;
    }
    return code;
  }

  // 驗證登入
  function validateForm() {
    let error = "";

    // 帳號英數至少8位，不可為空
    let account = $("#account").val();
    if (account.length < 8 || !account.match(/^[a-zA-Z0-9]+$/)) {
      error += "帳號只能輸入英文及數字，且至少8位!<br>";
    }

    //密碼數+大寫英文字母+小寫英文字母共8位，不可為空
    let password = $("#password").val();
    if (
      password.length < 8 ||
      !password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)
    ) {
      error += "密馬需包含大小寫英文字母及數字，且至少8位!<br>";
    }

    // 呼叫方法比對驗證碼，不可為空
    let verificationInput = $("#verificationInput").val();
    let code = $("#verificationCode").text();
    if (verificationInput !== code) {
      error += "驗證碼錯誤，請重新輸入!<br>";
    }

    if(error != ""){
      Swal.fire({
        icon: "error",
        title: "登入失敗",
        html: error,
      });
      return false;
    }
    return true;
  }

  // 綁定登入按鈕
  $("#submitBtn").on("click", (e) => {
    if (!validateForm()) {
      e.preventDefault();
      // 重新產生驗證碼
      $("#verificationCode").text(generateVerificationCode());
    } else {
      alert("success");
    }
  });
});
