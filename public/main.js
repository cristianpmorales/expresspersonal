var thumbUp = document.getElementsByClassName("fa-thumbs-up");
var thumbDown = document.getElementsByClassName("fa-thumbs-down");
var trash = document.getElementsByClassName("fa fa-trash");

Array.from(thumbUp).forEach(function(element) {
      element.addEventListener('click', function(){
        const title = this.parentNode.parentNode.childNodes[1].innerText
        const aurthor = this.parentNode.parentNode.childNodes[3].innerText
        const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
        fetch('thumb', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'title': title,
            'aurthor':aurthor,
            'thumbUp':thumbUp
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});


Array.from(thumbDown).forEach(function(element) {
      element.addEventListener('click', function(){
        const title = this.parentNode.parentNode.childNodes[1].innerText
        const aurthor = this.parentNode.parentNode.childNodes[3].innerText
        const thumbUpCount = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
        fetch('thumbDown', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'title': title,
            'aurthor':aurthor,
            'thumbUp':thumbUpCount,
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        console.log("ckicked?")
        const title = this.parentNode.parentNode.childNodes[1].innerText
        const aurthor = this.parentNode.parentNode.childNodes[3].innerText
        fetch('booktitles', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'title': title,
            'aurthor':aurthor,
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
