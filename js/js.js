function start() { // inicio start()
  $("#inicio").hide();
  $("#fundoGame").append("<div id='jogador' class='anima1'></div>");
  $("#fundoGame").append("<div id='inimigo1'></div>");
  $("#fundoGame").append("<div id='inimigo2'></div>");
  $("#fundoGame").append("<div id='amigo' class='anima3'></div>");

  // variaveis
  var jogo = {}
  var TECLA = {
    W: 87,
    S: 83,
    D: 68
  }
  var velocidade = 7
  var posicaoY = parseInt(Math.random() * 334)
  var podeAtirar = true

  jogo.pressionou = []
  $(document).keydown(function(e){
    jogo.pressionou[e.which] = true
  })

  $(document).keyup(function(e){
    jogo.pressionou[e.which] = false
  })

  // game loop
  jogo.timer = setInterval(loop, 30)

  function loop(){
    movefundo()
    movejogador()
    moveinimigo1()
    colisao()
  }

  function movefundo() {
    esquerda = parseInt($("#fundoGame").css("background-position"))
    $("#fundoGame").css("background-position", esquerda - 1)
  } 

  function movejogador() {
    if (jogo.pressionou[TECLA.W]){
      var top = parseInt($("#jogador").css("top"))
      if (top > 10) {
        $("#jogador").css("top", top - 10)
      }
    }
    if (jogo.pressionou[TECLA.S]){
      var top = parseInt($("#jogador").css("top"))
      if (top < 410) {
        $("#jogador").css("top", top + 10)
      }
    }
    if (jogo.pressionou[TECLA.D]){
      disparo()
    }
  }

  function moveinimigo1() {
    posicaoX = parseInt($('#inimigo1').css('left'))
    $('#inimigo1').css('left', posicaoX - velocidade)
    $('#inimigo1').css('top', posicaoY)
    if (posicaoX <= -3){
      posicaoY = parseInt(Math.random() * 334)
      $('#inimigo1').css('left', 710)
      $('#inimigo1').css('top', posicaoY)
    }
  }
  
  var tempoDisparo;
  function disparo() {
    if (podeAtirar == true) {
      podeAtirar = false;
      topo = parseInt($("#jogador").css("top"))
      posicaoX = parseInt($("#jogador").css("left"))
      tiroX = posicaoX + 130
      topoTiro = topo + 40
      $("#fundoGame").append("<div id='disparo'></div>")
      $("#disparo").css("top", topoTiro)
      $("#disparo").css("left", tiroX)

      tempoDisparo = window.setInterval(executaDisparo, 30)

    } 
  }

  function executaDisparo() {
    posicaoX = parseInt($("#disparo").css("left"))
    $("#disparo").css("left", posicaoX + 15)
    console.log(posicaoX)
    if (posicaoX > 900) {
      window.clearInterval(tempoDisparo)
      tempoDisparo = null
      $("#disparo").remove()
      podeAtirar = true
    }
  }

  function colisao(){
    var colisao1 = ($("#jogador").collision($("#inimigo1")))
    if (colisao1.length > 0) {

      inimigo1X = parseInt($("#inimigo1").css("left"))
      inimigo1Y = parseInt($("#inimigo1").css("top"))
      explosao1(inimigo1X, inimigo1Y)

      posicaoY = parseInt(Math.random()*334)
      $("#inimigo1").css("left", 710)
      $("#inimigo1").css("top", posicaoY)
    }
  }

  function explosao1(inimigo1X, inimigo1Y) {
    $("#fundoGame").append("<div id='explosao1'></div>")
    $("#explosao1").css("background-image", "url(imgs/explosao.png)")
    var div = $("#explosao1")
    div.css("top", inimigo1Y)
    div.css("left", inimigo1X)
    div.animate({width:150, opacity:0}, "slow")
    var tempoExplosao = window.setInterval(removeExplosao, 1000)
    function removeExplosao() {
      div.remove()
      window.clearInterval(tempoExplosao)
      tempoExplosao = null
    }
  }

  // fim do loop

} // fim start()