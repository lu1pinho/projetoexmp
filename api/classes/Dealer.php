<?php

namespace classes;
use model\Usuarios;

class Dealer extends Usuarios {
    private $status;
    private $accountType;
    private $rating;
    private $paymentMethods;
    private $registrationDate;
    private $cargo;

    public function __construct($nome, $sobrenome, $email, $cpf, $endereco, $telefone, $nascimento, $senha, $profilePicUrl, $cnpj = null, $status = 'ativo', $accountType = 'básica', $rating = 0, $paymentMethods = [])
    {
        // Adicione o cnpj como décimo parâmetro aqui:
        $cnpj = $cnpj ? preg_replace('/[^\d]/', '', $cnpj) : null;
        parent::__construct($nome, $sobrenome, $email, $cpf, $endereco, $telefone, $nascimento, $senha, $profilePicUrl, $cnpj);

        // Define o CNPJ se ele for fornecido
        if ($cnpj) {
            $this->setCnpj($cnpj);
        }

        // Inicialização dos atributos específicos de Dealer
        $this->setStatus($status);
        $this->setAccountType($accountType);
        $this->setRating($rating);
        $this->setPaymentMethods($paymentMethods);
        $this->registrationDate = new \DateTime();
    }

    // Métodos Getters e Setters

    public function getStatus()
    {
        return $this->status;
    }

    public function getAccountType()
    {
        return $this->accountType;
    }

    public function getRating()
    {
        return $this->rating;
    }

    public function getPaymentMethods()
    {
        return $this->paymentMethods;
    }

    public function getRegistrationDate()
    {
        return $this->registrationDate->format('Y-m-d');
    }

    public function getCargo()
    {
        return isset($this->cargo) ? $this->cargo : 1;
    }

    public function setCargo($cargo)
    {
        $this->cargo = $cargo;
    }

    // Setters com validação

    public function setStatus($status)
    {
        $validStatuses = ['ativo', 'inativo', 'suspenso'];
        if (!in_array($status, $validStatuses)) {
            throw new \Exception('Status inválido');
        }
        $this->status = $status;
    }

    public function setAccountType($accountType)
    {
        $validTypes = ['básica', 'premium'];
        if (!in_array($accountType, $validTypes)) {
            throw new \Exception('Tipo de conta inválido');
        }
        $this->accountType = $accountType;
    }

    public function setRating($rating)
    {
        if ($rating < 0 || $rating > 5) {
            throw new \Exception('Avaliação deve ser entre 0 e 5');
        }
        $this->rating = $rating;
    }

    public function setPaymentMethods($paymentMethods)
    {
        if (!is_array($paymentMethods)) {
            throw new \Exception('Métodos de pagamento devem ser um array');
        }
        $this->paymentMethods = $paymentMethods;
    }
}