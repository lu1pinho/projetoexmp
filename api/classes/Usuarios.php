<?php

namespace model;

use DateTime;

class Usuarios
{
    private $nome;
    private $sobrenome;
    private $email;
    private $cpf;
    private $endereco;
    private $telefone;
    private $nascimento;
    private $senha;
    private $profilePicUrl;
    private $cnpj;

    /**
     * @throws \Exception
     */
    public function __construct($nome, $sobrenome, $email, $cpf, $endereco, $telefone, $nascimento, $senha, $profilePicUrl, $cnpj)
    {
        $this->setNome($nome, $sobrenome);
        $this->setEmail($email);
        $this->setCpf($cpf);
        $this->setEndereco($endereco);
        $this->setTelefone($telefone);
        $this->setSenha($senha);
        $this->profilePicUrl = $profilePicUrl;
        $this->setCnpj($cnpj);

        $date = DateTime::createFromFormat('d/m/Y', $nascimento);
        if ($date === false) {
            $date = DateTime::createFromFormat('Y-m-d', $nascimento);
        }

        if ($date !== false) {
            $this->nascimento = $date->format('Y-m-d');
        } else {
            $this->nascimento = null;
        }
    }

    // Setters
    public function setNome($nome, $sobrenome)
    {
        $this->nome = ucwords(strtolower($nome));
        $this->sobrenome = ucwords(strtolower($sobrenome));
    }

    public function setEmail($email)
    {
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new \Exception('Email inválido');
        } else {
            $this->email = strtolower($email);
        }
    }

    public function setCpf($cpf)
    {
        if (empty($cpf) && !empty($this->cnpj)) {
            $this->cpf = null;
        } elseif (!empty($cpf) && !preg_match('/[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}/', $cpf)) {
            throw new \Exception('CPF inválido');
        } else {
            $this->cpf = $cpf;
        }
    }

    public function setCnpj($cnpj)
    {
        // Remove qualquer pontuação do CNPJ, mantendo apenas os números
        $cnpj = preg_replace('/[^\d]/', '', $cnpj);

        // Verifica se o CNPJ está vazio e se há um CPF. Caso afirmativo, o CNPJ será nulo
        if (empty($cnpj) && !empty($this->cpf)) {
            $this->cnpj = null;
        }
        // Verifica se o CNPJ é válido (somente numérico e com 14 dígitos)
        elseif (!empty($cnpj) && !preg_match('/^[0-9]{14}$/', $cnpj)) {
            throw new \Exception('CNPJ inválido');
        } else {
            $this->cnpj = $cnpj;
        }
    }

    public function setEndereco($endereco)
    {
        $this->endereco = $endereco;
    }

    public function setTelefone($telefone)
    {
        $this->telefone = $telefone;
    }

    public function setSenha($senha)
    {
        $this->senha = password_hash($senha, PASSWORD_DEFAULT);
    }

    // Getters
    public function getNome()
    {
        return $this->nome;
    }

    public function getSobrenome()
    {
        return $this->sobrenome;
    }

    public function getEmail()
    {
        return $this->email;
    }

    public function getCpf()
    {
        return $this->cpf;
    }

    public function getCnpj()
    {
        return $this->cnpj;
    }

    public function getEndereco()
    {
        return $this->endereco;
    }

    public function getTelefone()
    {
        return $this->telefone;
    }

    public function getNascimentoFormat() {
        // Se houver data válida de nascimento, formate para 'DD/MM/YYYY'
        if ($this->nascimento) {
            $date = DateTime::createFromFormat('Y-m-d', $this->nascimento);
            return $date->format('d/m/Y');
        }
        // Se não houver data, retornará uma string vazia ou uma data padrão
        return 'Data não fornecida'; // ou simplesmente `return '';` caso prefira uma string vazia
    }

    public function getNascimento()
    {
        return $this->nascimento;
    }

    public function getSenha()
    {
        return $this->senha;
    }

    public function getProfilePicUrl()
    {
        return $this->profilePicUrl;
    }
}
