<?php

namespace classes;

class Produto
{
    // Informações básicas do produto
    private $nome;
    private $shortDescription;
    private $longDescription;
    private $preco;
    private $estoque;
    private $categoria;
    private $marca;

    // Informações de promoções e descontos
    private $desconto;
    private $oferta_dia;
    private $dataOfertaInicio;
    private $dataOfertaFim;

    // Informações do vendedor
    private $vendedor_id;
    private $localizacaoVendedor;

    // Imagens do produto
    private $image_url;
    private $imagens_adicionais;

    // Avaliações e interações com o produto
    private $avaliacaoMedia;
    private $quantidadeVendida;
    private $comentarios;

    // Controle de produto
    private $dataCadastro;
    private $produtoAtivo;
    private $garantia;
    private $frete_gratis;

    public function __construct($nome, $shortDescription, $longDescription, $preco, $estoque, $categoria, $marca, $desconto, $oferta_dia, $dataOfertaInicio, $dataOfertaFim, $vendedor_id, $localizacaoVendedor, $image_url, $imagens_adicionais, $avaliacaoMedia, $quantidadeVendida, $comentarios, $dataCadastro, $produtoAtivo, $garantia, $frete_gratis)
    {
        $this->setNome($nome);
        $this->setShortDescription($shortDescription);
        $this->setLongDescription($longDescription);
        $this->setPreco($preco);
        $this->setEstoque($estoque);
        $this->setCategoria($categoria);
        $this->setMarca($marca);
        $this->setDesconto($desconto);
        $this->setOfertaDia($oferta_dia);
        $this->setDataOfertaInicio($dataOfertaInicio);
        $this->setDataOfertaFim($dataOfertaFim);
        $this->setVendedorId($vendedor_id);
        $this->setLocalizacaoVendedor($localizacaoVendedor);
        $this->setImageUrl($image_url);
        $this->setImagensAdicionais($imagens_adicionais);
        $this->setAvaliacaoMedia($avaliacaoMedia);
        $this->setQuantidadeVendida($quantidadeVendida);
        $this->setComentarios($comentarios);
        $this->setDataCadastro($dataCadastro);
        $this->setProdutoAtivo($produtoAtivo);
        $this->setGarantia($garantia);
        $this->setFreteGratis($frete_gratis);
    }


    // Setters com formatação

    public function setNome($nome)
    {
        $this->nome = substr(trim($nome), 0, 255); // Limita a 255 caracteres
    }

    public function setShortDescription($shortDescription)
    {
        $this->shortDescription = trim($shortDescription);
    }

    public function setLongDescription($longDescription)
    {
        $this->longDescription = trim($longDescription);
    }

    public function setPreco($preco)
    {
        $this->preco = number_format((float)$preco, 2, '.', ''); // Formata para decimal(10,2)
    }

    public function setEstoque($estoque)
    {
        $this->estoque = (int)$estoque;
    }

    public function setCategoria($categoria)
    {
        $this->categoria = substr(ucfirst(strtolower(trim($categoria))), 0, 100); // Limita a 100 caracteres
    }

    public function setMarca($marca)
    {
        $this->marca = substr(ucfirst(strtolower(trim($marca))), 0, 100); // Limita a 100 caracteres
    }

    public function setDesconto($desconto)
    {
        $this->desconto = number_format((float)$desconto, 2, '.', ''); // Formata para decimal(5,2)
    }

    public function setOfertaDia($oferta_dia)
    {
        $this->oferta_dia = (bool)$oferta_dia; // Converte para booleano
    }

    public function setDataOfertaInicio($dataOfertaInicio)
    {
        $this->dataOfertaInicio = date('Y-m-d H:i:s', strtotime($dataOfertaInicio)); // Formato datetime
    }

    public function setDataOfertaFim($dataOfertaFim)
    {
        $this->dataOfertaFim = date('Y-m-d H:i:s', strtotime($dataOfertaFim)); // Formato datetime
    }

    public function setVendedorId($vendedor_id)
    {
        $this->vendedor_id = (int)$vendedor_id;
    }

    public function setLocalizacaoVendedor($localizacaoVendedor)
    {
        $this->localizacaoVendedor = substr(ucfirst(strtolower(trim($localizacaoVendedor))), 0, 255); // Limita a 255 caracteres
    }

    public function setImageUrl($image_url)
    {
        $this->image_url = filter_var($image_url, FILTER_SANITIZE_URL); // Sanitiza a URL
    }

    public function setImagensAdicionais($imagens_adicionais)
    {
        $this->imagens_adicionais = array_map('filter_var', $imagens_adicionais, array_fill(0, count($imagens_adicionais), FILTER_SANITIZE_URL)); // Sanitiza URLs adicionais
    }

    public function setAvaliacaoMedia($avaliacaoMedia)
    {
        $this->avaliacaoMedia = number_format((float)$avaliacaoMedia, 2, '.', ''); // Formata para decimal(3,2)
    }

    public function setQuantidadeVendida($quantidadeVendida)
    {
        $this->quantidadeVendida = (int)$quantidadeVendida;
    }

    public function setComentarios($comentarios)
    {
        if (is_array($comentarios)) {
            $this->comentarios = array_map('trim', $comentarios); // Remove espaços em cada comentário
        } else {
            $this->comentarios = [trim($comentarios)]; // Converte string para array
        }
    }

    public function setDataCadastro($dataCadastro)
    {
        $this->dataCadastro = date('Y-m-d H:i:s', strtotime($dataCadastro)); // Formato datetime
    }

    public function setProdutoAtivo($produtoAtivo)
    {
        $this->produtoAtivo = (bool)$produtoAtivo; // Converte para booleano
    }

    public function setGarantia($garantia)
    {
        $this->garantia = substr(trim($garantia), 0, 255); // Limita a 255 caracteres
    }

    public function setFreteGratis($frete_gratis)
    {
        $this->frete_gratis = (bool)$frete_gratis; // Converte para booleano
    }


    // Getters

    public function getNome()
    {
        return $this->nome;
    }

    public function getShortDescription()
    {
        return $this->shortDescription;
    }

    public function getLongDescription()
    {
        return $this->longDescription;
    }

    public function getPreco()
    {
        return $this->preco;
    }

    public function getEstoque()
    {
        return $this->estoque;
    }

    public function getCategoria()
    {
        return $this->categoria;
    }

    public function getMarca()
    {
        return $this->marca;
    }

    public function getDesconto()
    {
        return $this->desconto;
    }

    public function getOfertaDia()
    {
        return $this->oferta_dia;
    }

    public function getDataOfertaInicio()
    {
        return $this->dataOfertaInicio;
    }

    public function getDataOfertaFim()
    {
        return $this->dataOfertaFim;
    }

    public function getVendedorId()
    {
        return $this->vendedor_id;
    }

    public function getLocalizacaoVendedor()
    {
        return $this->localizacaoVendedor;
    }

    public function getImageUrl()
    {
        return $this->image_url;
    }

    public function getImagensAdicionais()
    {
        return $this->imagens_adicionais;
    }

    public function getAvaliacaoMedia()
    {
        return $this->avaliacaoMedia;
    }

    public function getQuantidadeVendida()
    {
        return $this->quantidadeVendida;
    }

    public function getComentarios()
    {
        return $this->comentarios;
    }

    public function getDataCadastro()
    {
        return $this->dataCadastro;
    }

    public function getProdutoAtivo()
    {
        return $this->produtoAtivo;
    }

    public function getGarantia()
    {
        return $this->garantia;
    }

    public function getFreteGratis()
    {
        return $this->frete_gratis;
    }
}