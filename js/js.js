var recordeFacil = 0;
var recordeDificil = 0;
var tentativas = 0;
function start(velocidadex) { // inicio start()
  $("#inicio").hide();
  $("#fundoGame").append("<div id='jogador' class='anima1'></div>");
  $("#fundoGame").append("<div id='inimigo1'></div>");
  $("#fundoGame").append("<div id='inimigo2'></div>");
  $("#fundoGame").append("<div id='amigo' class='anima3'></div>");
  $("#fundoGame").append("<div id='placar'></div>")
  // variaveis
  var jogo = {}
  var TECLA = {
    W: 87,
    S: 83,
    D: 68
  }
  var velocidade = velocidadex
  var podeAtirar = true
  var score = 0;
  var vidas = 3;
  var posicaoY = parseInt(Math.random() * 334)
  var fimdejogo = false;

  jogo.pressionou = []
  $(document).keydown(function (e) {
    jogo.pressionou[e.which] = true
  })
  
  $(document).keyup(function (e) {
    jogo.pressionou[e.which] = false
  })
  
  // game loop
  jogo.timer = setInterval(loop, 30)

  function loop() {
    verificafim()
    if (fimdejogo == true) {
      clearInterval(jogo.timer)
      limpacenario()
      $("#record").remove()
      $("#record").remove()
      $("#fundoGame").append("<div id='fim'></div>")
      if (velocidade == 5 ) {
        $("#fim").append("<h1 id='gameOver'> Game Over </h1><p>Sua pontuação foi de: " + score + "</p>" + "<p>Maior pontuação: " + recordeFacil + "</p>"  
          + "<div id='reinicia' onClick=reiniciaJogo(5)><p class='glow-on-hover' style='padding: 5px; margin-top: 20px;'>Jogar novamente</p></div>" 
          + "<div onClick=menuprincipal()><p class='glow-on-hover' style='padding: 5px; margin-top: 8px;'>Voltar para menu principal</p></div>")
      }
      else{
        $("#fim").append("<h1 id='gameOver'> Game Over </h1><p>Sua pontuação foi de: " + score + "</p>" + "<p>Maior pontuação: " + recordeDificil + "</p>"  
          + "<div id='reinicia' onClick=reiniciaJogo(10)><p class='glow-on-hover' style='padding: 5px; margin-top: 20px;'>Jogar novamente</p></div>"
          + "<div onClick=menuprincipal()><p class='glow-on-hover' style='padding: 5px; margin-top: 8px;'>Voltar para menu principal</p></div>")
      } 
      $("#inicio").append("<div id='record'>Recorde modo fácil: <span id='scoreFacil'></span></div>")
      $("#inicio").append("<div id='record'>Recorde modo difícil: <span id='scoreDificil'></span></div>")
      $("#scoreFacil").html(recordeFacil)
      $("#scoreDificil").html(recordeDificil)
    } 
    else {
      movefundo()
      movejogador()
      moveinimigo1()
      moveinimigo2()
      colisao()
      ganhapontos()
    }
  }


  function verificafim() {
    if (score > recordeFacil && velocidadex == 5) {
      recordeFacil = score
    }
    else if (score > recordeDificil && velocidadex == 10) {
      recordeDificil = score
    }
    if(vidas <= 0) {
      fimdejogo = true
    }
  }

  function limpacenario() {
    $("#jogador").remove();
    $("#inimigo1").remove();
    $("#inimigo2").remove();
    $("#amigo").remove();
    $("#placar").remove()
  } 

  function movefundo() {
    esquerda = parseInt($("#fundoGame").css("background-position"))
    $("#fundoGame").css("background-position", esquerda - 1)
  }

  function ganhapontos() {
    score++;
    $("#placar").html("Pontos: " + score)
  }

  function movejogador() {
    if (jogo.pressionou[TECLA.W]) {
      var top = parseInt($("#jogador").css("top"))
      if (top > 10) {
        $("#jogador").css("top", top - 15)
      }
    }
    if (jogo.pressionou[TECLA.S]) {
      var top = parseInt($("#jogador").css("top"))
      if (top < 500) {
        $("#jogador").css("top", top + 15)
      }
    }
    if (jogo.pressionou[TECLA.D]) {
      disparo()
    }
  }

  function moveinimigo1() {
    posicaoX = parseInt($('#inimigo1').css('left'))
    $('#inimigo1').css('left', posicaoX - velocidade)
    $('#inimigo1').css('top', posicaoY)
    if (posicaoX <= 3) {
      posicaoY = parseInt(Math.random() * 334)
      $('#inimigo1').css('left', 710)
      $('#inimigo1').css('top', posicaoY)
    }
  }

  function moveinimigo2() {
    posicaoX = parseInt($('#inimigo2').css('left'))
    $('#inimigo2').css('left', posicaoX - velocidade)
    $('#inimigo2').css('top', 520)
    if (posicaoX <= 1) {
      $('#inimigo2').css('left', 720)
    }
  }

  var tempoDisparo;
  function disparo() {
    if (podeAtirar == true) {
      podeAtirar = false;
      topo = parseInt($("#jogador").css("top"))
      posicaoX = parseInt($("#jogador").css("left"))
      tiroX = posicaoX + 80
      topoTiro = topo + 40
      $("#fundoGame").append("<div id='disparo'></div>")
      $("#disparo").css("top", topoTiro)
      $("#disparo").css("left", tiroX)

      tempoDisparo = window.setInterval(executaDisparo, 30)

    }
  }

  function executaDisparo() {
    posicaoX = parseInt($("#disparo").css("left"))
    $("#disparo").css("left", posicaoX + 25)

    if ((posicaoX > 900)) {
      window.clearInterval(tempoDisparo)
      tempoDisparo = null
      $("#disparo").remove()
      podeAtirar = true
    }
  }

  function colisao() {
    var colisao1 = ($("#jogador").collision($("#inimigo1")))
    var colisao2 = ($("#jogador").collision($("#inimigo2")));
    var colisao3 = ($("#disparo").collision($("#inimigo1")));
    var colisao4 = ($("#disparo").collision($("#inimigo2")));
    var colisao6 = ($("#inimigo2").collision($("#amigo")));
    if (colisao1.length > 0) {

      inimigo1X = parseInt($("#inimigo1").css("left"))
      inimigo1Y = parseInt($("#inimigo1").css("top"))
      explosao1(inimigo1X, inimigo1Y)

      posicaoY = parseInt(Math.random() * 334)
      $("#inimigo1").css("left", 710)
      $("#inimigo1").css("top", posicaoY)
      vidas -= 1
    }

    if (colisao2.length > 0) {

      inimigo2X = parseInt($("#inimigo2").css("left"))
      inimigo2Y = parseInt($("#inimigo2").css("top"))
      explosao2(inimigo2X, inimigo2Y)

      $("#inimigo2").remove()
      // $("#inimigo2").css("left", 780)
      // $("#inimigo2").css("top", 477)
      reposicionaInimigo2();
      vidas -= 1
    }

    if (colisao3.length > 0) {

      inimigo1X = parseInt($("#inimigo1").css("left"))
      inimigo1Y = parseInt($("#inimigo1").css("top"))
      explosao1(inimigo1X, inimigo1Y)
      $("#disparo").css("left", 950)
      posicaoY = parseInt(Math.random() * 334)
      $("#inimigo1").css("left", 710)
      $("#inimigo1").css("top", posicaoY)
    }

    if (colisao4.length > 0) {
      inimigo2X = parseInt($("#inimigo2").css("left"))
      inimigo2Y = parseInt($("#inimigo2").css("top"))
      $("#inimigo2").remove()
      explosao2(inimigo2X, inimigo2Y)
      $("#disparo").css("left", 950)
      reposicionaInimigo2();
    }

    if (colisao6.length > 0) {
      amigoX = parseInt($("#amigo").css("left"));
      amigoY = parseInt($("#amigo").css("top"));
      explosao3(amigoX, amigoY);
      $("#amigo").remove();
      reposicionaAmigo();
      vidas -= 1
    }
  }

  function explosao1(inimigo1X, inimigo1Y) {
    $("#fundoGame").append("<div id='explosao1'></div>")
    $("#explosao1").css("background-image", "url(imgs/explosao.png)")
    var div = $("#explosao1")
    div.css("top", inimigo1Y - 50)
    div.css("left", inimigo1X)
    div.animate({ width: 150, opacity: 0 }, "slow")
    var tempoExplosao = window.setInterval(removeExplosao, 1000)
    function removeExplosao() {
      div.remove()
      window.clearInterval(tempoExplosao)
      tempoExplosao = null
    }
  }

  function explosao2(inimigo2X, inimigo2Y) {
    $("#fundoGame").append("<div id='explosao2'></div>")
    $("#explosao2").css("background-image", "url(imgs/explosao.png)")
    var div = $("#explosao2")
    div.css("top", inimigo2Y - 50)
    div.css("left", inimigo2X)
    div.animate({ width: 150, opacity: 0 }, "slow")
    var tempoExplosao2 = window.setInterval(removeExplosao2, 1000)
    function removeExplosao2() {
      div.remove()
      window.clearInterval(tempoExplosao2)
      tempoExplosao2 = null
    }
  }

  function explosao3(amigoX, amigoY) { 
    $("#fundoGame").append("<div id='explosao3'></div>"); 
    $("#explosao3").css("background-image", "url(imgs/explosao.png)")
    var div = $("#explosao3")
    div.css("top", amigoY - 50)
    div.css("left", amigoX)
    div.animate({ width: 150, opacity: 0 }, "slow")
    var tempoExplosao3 = window.setInterval(removeExplosao3, 1000)
    function removeExplosao3() {
      div.remove()
      window.clearInterval(tempoExplosao3)
      tempoExplosao3 = null
    }
  }

  function reposicionaInimigo2() {
    var tempoColisao4 = window.setInterval(reposiciona4, 5000);
    function reposiciona4() {
      window.clearInterval(tempoColisao4);
      tempoColisao4 = null;
      if (fimdejogo == false) {
        $("#fundoGame").append("<div id='inimigo2'></div>");
      }

    }
  }

  function reposicionaAmigo() {
    var tempoAmigo = window.setInterval(reposiciona6, 6000);
    function reposiciona6() {
      window.clearInterval(tempoAmigo);
      tempoAmigo = null;
      if (fimdejogo == false) {
        $("#fundoGame").append("<div id='amigo' class='anima3'></div>");
      }
    }
  }

  // fim do loop
  
} // fim start()

function reiniciaJogo(velociadadex) {
  $("#fim").remove()
  start(velociadadex)
}

function menuprincipal() {
  $("#fim").remove();
  $("#inicio").show()
}
