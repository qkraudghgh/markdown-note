const simplemde = new SimpleMDE({
  element: document.getElementById("markdown"),
  toolbar: false,
  spellChecker: false
});

function save() {
  if (confirm("저장하시겠습니까?")) {
    $.ajax({
      url: '/write',
      type: 'post',
      data: {text: simplemde.value()},
      success: function(data) {
        window.location.href = `/${data}`
      },
      fail: function(err) {
        console.err(err)
      }
    })
  }
}
