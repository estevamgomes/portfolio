// abrir e fechar produtos

var imagem_zoom_container = document.createElement('span');
	imagem_zoom_container.id = "imagem-zoom-container";

	imagem_zoom_container.addEventListener('click', function(event) {
		this.classList.remove('ativo');
	});

var imagem_zoom = document.createElement('img');
	imagem_zoom.id = "imagem-zoom";


var imagem_zoom_loading = document.createElement('div');
	imagem_zoom_loading.classList.add('loading');

	// divs para animacao do loading
	imagem_zoom_loading.appendChild(document.createElement('div'));
	imagem_zoom_loading.appendChild(document.createElement('div'));
	imagem_zoom_loading.appendChild(document.createElement('div'));
	imagem_zoom_loading.appendChild(document.createElement('div'));

imagem_zoom_container.appendChild(imagem_zoom);
imagem_zoom_container.appendChild(imagem_zoom_loading);
document.body.appendChild(imagem_zoom_container);

var produtos = document.getElementsByClassName('produto'); 
for (var p = 0; p < produtos.length; p++) {
	var id_div = document.createElement('div');
	id_div.innerHTML = p;
	id_div.style.display = 'none';
	id_div.classList.add('id');
	produtos[p].appendChild(id_div);
}

var produtos_imagens = document.getElementsByClassName('produto-imagens'); 

for (var p = 0; p < produtos_imagens.length; p++) {
	var imagem = produtos_imagens[p].getElementsByTagName('img'); 
	imagem[0].addEventListener('click', function(event) {

		imagem_zoom_container.classList.add('ativo');
		// imagem_zoom.style.backgroundImage = 'url("' + this.src + '")';
		imagem_zoom.src = this.src;

		var hires_src = this.getAttribute('data-src-hires');
		var img_downloading = new Image();
		img_downloading.onload = function() {
			// imagem_zoom.style.backgroundImage = 'url("' + this.src + '")';
			imagem_zoom_loading.classList.add('carregado');
			imagem_zoom.src = this.src;
		};
		img_downloading.src = hires_src;
	});
}



// detalhes dos produtos

var produtos_info = document.getElementsByClassName('expandir'); 

for (var p = 0; p < produtos_info.length; p++) {
	produtos_info[p].addEventListener('click', function() {
		this.parentNode.classList.toggle('ativo');
	});
}


// filtrar produtos

var produtos_div = document.getElementById('produtos'),
	produtos_visiveis = document.getElementById('produtos-container'),
	produtos_invisiveis = document.createElement('div');

produtos_invisiveis.id = 'produtos_invisiveis';
produtos_invisiveis.style.display = 'none';
produtos_div.appendChild(produtos_invisiveis);

var filtros 			= document.getElementById('produtos-filtros-container');
var filtros_checkbox 	= filtros.getElementsByClassName('filtro-checkbox');

var categoria_checkbox 	= filtros.getElementsByClassName('categoria-checkbox');
var tiragem_checkbox 	= filtros.getElementsByClassName('tiragem-checkbox');
var formato_checkbox 	= filtros.getElementsByClassName('formato-checkbox');

for (var c = 0; c < filtros_checkbox.length; c++) {

	filtros_checkbox[c].addEventListener('change', function(event) {

		for (var p = produtos.length - 1; p >= 0; p--) {

			var categoria = false,
				tiragem = false,
				formato = false;

			for (var i = 0; i < categoria_checkbox.length; i++) {
				var classe = categoria_checkbox[i].name;
				if(categoria_checkbox[i].checked && produtos[p].classList.contains(classe)) categoria = true;
			}

			for (var i = 0; i < tiragem_checkbox.length; i++) {
				var classe = tiragem_checkbox[i].name;
				if(tiragem_checkbox[i].checked && produtos[p].classList.contains(classe)) tiragem = true;
			}

			for (var i = 0; i < formato_checkbox.length; i++) {
				var classe = formato_checkbox[i].name;
				if(formato_checkbox[i].checked && produtos[p].classList.contains(classe)) formato = true;
			}

			if(categoria && tiragem && formato) {
				// produtos[p].classList.remove('desabilitado');
				produtos_visiveis.appendChild(produtos[p]);
			} else {
				// produtos[p].classList.add('desabilitado');
				produtos_invisiveis.appendChild(produtos[p]);
			}

			ordenar_produtos();
		}
			
		if(produtos_visiveis.children.length == 0) {
			produtos_visiveis.classList.add('vazio');
		} else {
			produtos_visiveis.classList.remove('vazio');			
		}
	});
}

// menu toggle
var menu_toggle = document.getElementsByClassName('menu-dropdown-toggle'); 
var menu_dropdown = document.getElementsByClassName('menu-dropdown'); 

for (var mt = 0; mt < menu_toggle.length; mt++) {
	menu_toggle[mt].addEventListener('click', function(event) {
		event.preventDefault();

		for (var i = menu_toggle.length - 1; i >= 0; i--) {
			var id = menu_toggle[i].name;

			if(menu_toggle[i] == this) {
				menu_toggle[i].classList.toggle('ativo');
				document.getElementById(id).classList.toggle('ativo');
				document.getElementById(id).style.left = this.offsetLeft + "px";
			} else {
				menu_toggle[i].classList.remove('ativo');
				document.getElementById(id).classList.remove('ativo');
			}
			
		}

	});
}



// ordenar
// item_classe: classe do item que será comparado
// numeral: true/false se é ou não um número
// crescente: true/false se é na ordem crescente (true) ou decrescente (false)

function ordenar(item_classe, numeral = false, crescente = true) {
	var list, i, switching, b, shouldSwitch, key, nextkey;
	list = document.getElementById("produtos-container");
	switching = true;

	// cria um loop que continuará até que nenhuma troca seja feita
	while (switching) {

		// inicia dizendo que as trocas já foram feitas
		switching = false;
		
		// adiciona os produtos a uma lista
		b = list.getElementsByClassName("produto");

		// circula por todos os itens da lista
		for (i = 0; i < (b.length - 1); i++) {

			// inicia a variável dizendo que näo precisa trocar
			shouldSwitch = false;

			// checa se o próximo item deve trocar de lugar com o atual
			key = b[i].getElementsByClassName(item_classe);
			nextkey = b[i + 1].getElementsByClassName(item_classe);

			key = key[0].innerHTML.toLowerCase();
			nextkey = nextkey[0].innerHTML.toLowerCase();

			// transforma a variável em numeral para possibilitar comparação
			if(numeral) {
				key = Number(key);
				nextkey = Number(nextkey);				
			}

			// se a ordem for crescente
			if(crescente) {

				/* If next item is alphabetically lower than current item,
					mark as a switch and break the loop: */
				if (key > nextkey) {
					shouldSwitch = true;
					break;
				}

			} else {

				/* If next item is alphabetically lower than current item,
					mark as a switch and break the loop: */
				if (key < nextkey) {
					shouldSwitch = true;
					break;
				}

			}
		}

		if (shouldSwitch) {
			/* If a switch has been marked, make the switch and mark the switch as done: */
			b[i].parentNode.insertBefore(b[i + 1], b[i]);
			switching = true;
		}
	}
}

var ordem_container = document.getElementById('produtos-ordem'),
	ordem_botoes = ordem_container.getElementsByClassName('botao'),
	ordem_botoes_txt = document.createElement('span');

var ordem_toggle = document.getElementById('ordem-toggle');
	ordem_toggle.appendChild(ordem_botoes_txt);

for (var ob = ordem_botoes.length - 1; ob >= 0; ob--) {
	ordem_botoes[ob].addEventListener('click', function(event) {
		event.preventDefault();
		ordem_toggle.value = this.value;
		ordem_botoes_txt.innerHTML = ': ' + this.innerHTML;
		ordenar_produtos();
	});
}

function ordenar_produtos() {
	var ordem_tipo = ordem_toggle.value;
	switch(ordem_tipo) {
		case 'recentes':
			ordenar('ano', true, false);
			break;
		case 'menor-preco':
			ordenar('preco-valor', true, true);
			break;
		case 'maior-preco':
			ordenar('preco-valor', true, false);
			break;
		default:
			ordenar('id', true, true);
			break;
	}
}