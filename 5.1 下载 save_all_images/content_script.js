

var aaa =  {
  "title": document.title,
  "imglist":  [].map.call(document.getElementsByTagName('img'), function (img) {
    return img.src;
  }),
};
aaa;
