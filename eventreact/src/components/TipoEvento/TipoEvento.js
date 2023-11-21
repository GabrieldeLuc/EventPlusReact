import React, { useEffect, useState } from "react";
import Title from "../Pages/Title";
import "./TipoEvento.css";
import MainContent from "../MainContent/MainContent";
import ImageIllustrator from "../../components/ImageIllustrator/ImageIllustrator";
import api from "../../Services/Services";
import Notification from "../Notification/Notification";
import Spinner from "../../components/Spinner/Spinner"; 
import Container from "../../components/container/Container";
import eventTypeImage from "../../assets/images/tipo-evento.svg";

import { Input, Button } from "../FormComponents/FormComponents";
import TableTp from "./TableTp/TableTp";

const TipoEvento = () => {
  const [frmEdit, setFrmEdit] = useState(false);

  const [titulo, setTitulo] = useState("");
  const [idEvento, setIdEvento] = useState(null); // usar apenas para a edição

  const [notifyUser, setNotifyUser] = useState({});

  const [tipoEventos, setTipoEventos] = useState([]); // array mocado

  // Ao carregar a página 
  useEffect(() => {
    async function getTipoEventos() {
      setShowSpinner(true); 
      try {
        const retorno = await api.get("/TiposEvento"); // chama a rota de cadastro
        console.log(retorno);
        setTipoEventos(retorno.data);
      } catch (error) {
        console.log(" Falha na Api");
        // console.log(error);
      }
      setShowSpinner(false); 
    }

    getTipoEventos();
    console.log("Tipo Eventos Montada.");
  }, []);

  async function handleSubmit(e) {
    //parar submit do formulário
    e.preventDefault();
    //validar pelo menos 3 caracteres
    if (titulo.trim().length < 3) {
      alert("O Título deve ter no mínimo 3 caracteres");
      return;
    }
    //chamar a api
    try {
      setNotifyUser({
        titleNote: "Sucesso",
        textNote: `Cadastrado com sucesso!`,
        imgIcon: "success",
        imgAlt:
          "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
        showMessage: true,
      });

      const retorno = await api.post("/TiposEvento", { titulo: titulo });
      const promiseGet = await api.get("/TiposEvento"); // Atualização da Página
      setTipoEventos(promiseGet.data);
      console.log(retorno.data);
      setTitulo(""); //limpa a variável
    } catch (error) {
      console.log("Falha na api: ");
      console.log(error);
    }
  }

  /*************EDITAR CADASTRO************** */

  async function handleUpdate(e) {
    e.preventDefault();

    try {
      const retorno = await api.put("/TiposEvento/" + idEvento, {
        titulo: titulo,
      });
      //atualizar o state (api get)
      const retornoGet = await api.get("/TiposEvento");
      setTipoEventos(retornoGet.data); // atualiza o state da tabela
      alert("Atualizado com Sucesso !");
      //limpar o state do titulo e do idEvento
      editActionAbort();
    } catch (error) {
      alert("Problemas na atualização. Verifique a conexão com a internet !");
    }
  }

  function editActionAbort() {
    setIdEvento(null);
    setFrmEdit(false);
    setTitulo("");
  }

  async function showUpdateForm(idElemento) {
    setFrmEdit(true);
    //criar um state para idEvento

    try {
      //fazer um get by id para pegar os dados
      const retorno = await api.get("/TiposEvento/" + idElemento);

      //preenche o titulo e o id no state
      setTitulo(retorno.data.titulo);
      setIdEvento(retorno.data.idTipoEvento);
    } catch (error) {
      alert("Não foi posssível mostrar a tela de edição. Tente novamente");
    }

    //preencher o titulo no state
  }

  async function handleDelete(idEvento) {
    try {
      const retorno = await api.delete(`/TiposEvento/${idEvento}`);

      alert("Registro apagado com sucesso");
      const retornoGet = await api.get("/TiposEvento");
      setTipoEventos(retornoGet.data);
    } catch (error) {
      console.log("Falha ao Deletar");
    }
  }
  async function handleSubmit(e) {
    // parar o submit do formulário
    e.preventDefault();
    // validar pelo menos 3 caracteres
    if (titulo.trim().length < 3) {
      alert("O Título deve ter no mínimo 3 caracteres");
      return;
    }
    // chamar a api
    try {
      const retorno = await api.post("/TiposEvento", { titulo: titulo });
      console.log("CADASTRADO COM SUCESSO");
      console.log(retorno.data);
      setTitulo(""); //limpa a variável
    } catch (error) {
      console.log("Deu ruim na api:");
      console.log(error);
    }
  }

  return (
    <MainContent>
      <Notification {...notifyUser} setNotifyUser={setNotifyUser} />
     { showSpinner ? <Spinner /> : null}

      {/* Cadastro de Tipo Eventos */}
      <section className="cadastro-evento-section">
        <Container>
          <div className="cadastro-evento__box">
            <Title titleText={"Página Tipos de Eventos"} />
            <ImageIllustrator
              alterText={"??????"}
              imageRender={eventTypeImage}
            />

            <form
              className="ftipo-evento"
              onSubmit={frmEdit ? handleUpdate : handleSubmit}
            >
              {!frmEdit ? (
                <>
                  {/* Cadastrar */}
                  <Input
                    type={"text"}
                    id={"título"}
                    name={"titulo"}
                    required={"required"}
                    placeholder={"Título"}
                    value={titulo}
                    manipulationFunction={(e) => {
                      setTitulo(e.target.value);
                    }}
                  />
                  <span>{titulo}</span>
                  <Button
                    type={"submit"}
                    id={"cadastrar"}
                    name={"cadastrar"}
                    textButton={"Cadastrar"}
                  />
                </>
              ) : (
                <>
                  <input
                    id={"titulo"}
                    placeholder={"Título"}
                    name={"titulo"}
                    type="text"
                    required="required"
                    value={titulo}
                    manipulationFunction={(e) => {
                      setTitulo(e.target.value);
                    }}
                  />

                  <div className="buttons-editbox">
                    <Button
                      textButton="Atualizar"
                      id="atualizar"
                      name="atualizar"
                      type="submit"
                      additionalClass="button-component--middle"
                    />
                    <Button
                      textButton="Cancelar"
                      id="cancelar"
                      name="cancelar"
                      type="button"
                      manipulationFunction={editActionAbort}
                      additionalClass="button-component--middle"
                    />
                  </div>
                </>
              )}
            </form>
          </div>
        </Container>
      </section>

      {/* Listagem de Tipo Eventos */}
      <section className="lista-eventos-section">
        <Container>
          <Title titleText={"Lista Tipo de Eventos"} color="white" />

          <TableTp
            dados={tipoEventos}
            fnUpdate={showUpdateForm}
            fnDelete={handleDelete}
          />
        </Container>
      </section>
    </MainContent>
  );
};

export default TipoEvento;
