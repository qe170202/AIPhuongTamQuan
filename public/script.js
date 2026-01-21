document.addEventListener('contextmenu', event => {
  event.preventDefault();
  alert('Lý do bảo mật không click chuột phải !!!');
});

document.onkeydown = function(e) {
  if (e.keyCode == 123) { // F12 key
    alert('Không có f12 được nha !!!');
    return false;
  }
};