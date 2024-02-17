$(function () {
  // 按下登出按鈕
  $("#logoutBtn").on("click", () => {
    window.location.replace("/login/login.html?logout=true");
  });

  // 移出姓名輸入框驗證不可為空
  const newMemberName = $("#newMemberName");
  newMemberName.on("blur", () => {
    const memberName = newMemberName.val();
    const nameCheck = $("#nameCheck");
    if (memberName.trim() === "") {
      nameCheck.text("不可為空!");
    } else {
      nameCheck.text("");
    }
  });

  // 移出住址輸入框驗證不可為空
  const newMemberAddress = $("#newMemberAddress");
  newMemberAddress.on("blur", () => {
    const memberAddress = newMemberAddress.val();
    const addressCheck = $("#addressCheck");
    if (memberAddress.trim() === "") {
      addressCheck.text("不可為空!");
    } else {
      addressCheck.text("");
    }
  });

  // 移出電話輸入框驗證不可為空
  const newMemberPhone = $("#newMemberPhone");
  newMemberPhone.on("blur", () => {
    const memberPhone = newMemberPhone.val();
    const phoneCheck = $("#phoneCheck");
    if (memberPhone.trim() === "") {
      phoneCheck.text("不可為空!");
    } else {
      phoneCheck.text("");
    }
  });

  // 綁定按下儲存按鈕驗證validateForm()、新增功能saveMember()、清空文件功能clearForm()
  $("button.save").on("click", (e) => {
    e.preventDefault();

    if (!validateForm()) {
        return;
    } else {
      saveMember();
      clearForm();
    }
  });

  //validateForm() swal
  function validateForm() {
    let error = "";
    const memberName = newMemberName.val().trim();
    const memberAddress = newMemberAddress.val().trim();
    const memberPhone = newMemberPhone.val().trim();

    // 姓名不可為空
    if (memberName === "" || memberName.length > 10) {
      error += "姓名不可為空且限制10個文字內!<br>";
    }

    // 住址不可為空
    if (memberAddress === "" || memberAddress.length > 50) {
      error += "住址不可為空且制50個文字內!<br>";
    }

    // 電話不可為空 ====驗證/^[0-9-]+$/====
    if (memberPhone === "" || !/^[0-9-]{1,15}$/.test(memberPhone)) {
      error += "電話號碼不可為空且只可輸入數字及-，並限制15個數字內!<br>";
    }

    if (error !== "") {
      Swal.fire({
        icon: "error",
        title: "錯誤",
        html: error,
      });
      return false;
    }
    return true;
  }

  // 新增功能 ====自動加上checkbox和刪除按鈕 > 加在列表最下面 
  function saveMember() {
    const newRow = $("<tr>");
    newRow.html(`
    <th scope="row">
        <input class="check form-check-input" type="checkbox" value="" />
    </th>
    <th scope="row">${$("tbody tr").length + 1}</th>
    <td>${newMemberName.val()}</td>
    <td>${newMemberAddress.val()}</td>
    <td>${newMemberPhone.val()}</td>
    <td>
    <button type="button" class="btn btn-warning updateBtn">修改</button>
   
    <button class="btn deleteNewMemberBtn">
      刪除
    </button>
    </td>
  `);

    $("tbody").append(newRow);
  }

  // 清空文件功能
  function clearForm() {
    newMemberName.val("");
    newMemberAddress.val("");
    newMemberPhone.val("");
  }

  // checAll 判斷全選/全刪
  $("#checkAll").on("change", function () {
    if ($(this).prop("checked")) {
      // 全選
      $(".check").prop("checked", true);
    } else {
      // 取消全選
      $(".check").prop("checked", false);
    }
  });

  // check 少一取消全選/全部都全選
  $(".check").on("change", () => {
    const allChecked = $(".check:checked").length === $(".check").length;
    $("#checkAll").prop("checked", allChecked);
  });

  // 刪除該列
  $("tbody").on("click", ".deleteNewMemberBtn", function (e) {
    e.preventDefault(); // 阻止默認行為
    const rowToDelete = $(this).closest("tr"); // 獲取當前按鈕所在的行
    
    Swal.fire({
      title: "確認刪除?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "確認",
      cancelButtonText: "取消",
    }).then((result) => {
      if (result.isConfirmed) {
        rowToDelete.fadeOut(1000, () => {
            rowToDelete.remove();
            updateRowNumbers();
        });
      } 
      // else {
      //   console.log("取消刪除");
      // }
    });
  });

  // 重新取順序
  function updateRowNumbers() {
    $("tbody tr").each(function(index) {
      $(this).find("th:eq(1)").text(index + 1);
    });
  }

  // // 按下修改 > 
  // $(".updateBtn").on("click", () => {
   
  // })
  
});
