const warning =  `
      # 개인적으로 쓰려고 만든 서비스입니다.
      1. Github Flavor Markdown Memo 서비스입니다.
      2. 메모를 적고 저장하세요
      3. 혼자보거나 친구에게 url을 공유하세요

      # 주의사항
      1. 절대로 민감한 정보(주민등록번호, 전화번호, 신용카드 번호 등)을 저장하지 마세요. 서버가 털려서 유출되는 사항은 책임지지 않습니다.
      2. 저장해 두었던 메모는 어느 순간 사라질 수 있습니다. 임시로 쓰는 용도로만 사용해주세요.
      3. 제가 다른 사람이 저장한 메모를 읽진 않겠지만 메모가 파일 형태로 저장되므로 사용에 주의해주세요.

      # 사용하시다가 문제점이 발견되면 알려주세요
      - qkraudghgh@gmail.com
    `

const simplemde = new SimpleMDE({
  element: document.getElementById("markdown"),
  toolbar: false,
  spellChecker: false,
  placeholder: warning
});


function save() {
  if (confirm("저장하시겠습니까?")) {
    const text = simplemde.value();
    if (text.length === 0) {
      alert('내용을 입력해주세요.');
      return;
    }
    $.ajax({
      url: '/write',
      type: 'post',
      data: { text },
      success: function(data) {
        window.location.href = `/${data}`
      },
      fail: function(err) {
        console.err(err)
      }
    })
  }
}
