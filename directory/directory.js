$(function () {
  // 按下登出按鈕
  $("#logoutBtn").on("click", () => {
    window.location = "/login/login.html";
  });

  // 移出姓名輸入框驗證不可為空
  const newMemberName = $("#newMemberName");
  newMemberName.on("blur", () => {
    const memberName = newMemberName.val();
    const nameCheck = $("#nameCheck");
    if (memberName.trim() === ""){
        nameCheck.text('不可為空!');
    } else {
        nameCheck.text('');
    }
  })

  // 移出住址輸入框驗證不可為空
  const newMemberAddress = $("#newMemberAddress");
  newMemberAddress.on("blur", () => {
    const memberAddress = newMemberAddress.val();
    const addressCheck = $("#addressCheck");
    if (memberAddress.trim() === ""){
        addressCheck.text('不可為空!');
    } else {
        addressCheck.text('');
    }
  })

  // 移出電話輸入框驗證不可為空====驗證/^[0-9]+$/====
  const newMemberPhone = $("#newMemberPhone");
  newMemberPhone.on("blur", () => {
    const memberPhone = newMemberPhone.val();
    const phoneCheck = $("#phoneCheck");
    if (memberPhone.trim() === ""){
        phoneCheck.text('不可為空!');
    } else {
        phoneCheck.text('');
    }
  })


  // 綁定按下儲存按鈕驗證validateForm()、新增功能saveMember()、清空文件功能clearForm()
  

  //validateForm() swal


  // 新增功能 ====自動加上checkbox和刪除按鈕 > 加在列表最下面 > 重新取順序====
  function saveMember() {
    const formData = new FormData();

    formData.append("memberName", newMemberName.val());
    formData.append("memberAddress", newMemberAddress.val());
    formData.append("memberPhone", newMemberPhone.val());

  }

  // 清空文件功能
  function clearForm() {
    newMemberName.val("");
    newMemberAddress.val("");
    newMemberPhone.val("");

  }

  // checkbox 判斷全選

  //刪除該列

});
