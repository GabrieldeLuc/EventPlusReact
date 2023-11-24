import React, { useEffect, useState } from "react";
import MainContent from "../MainContent/MainContent";
import "./EventosPage.css";

import ImageIllustrator from "../ImageIllustrator/ImageIllustrator";
import eventImage from "../../assets/images/evento.svg";
import Title from "../Pages/Title";
import Container from "../container/Container";
import Notification from "../Notification/Notification";
import api from "../../Services/Services";

import TableTpE from "./TableTpE/TableTpE";
import { Button, Input, Select } from "../FormComponents/FormComponents";

const EventosPage = () => {
  const [frmEdit, setFrmEdit] = useState(false);

  const [evento, setEvento] = useState([]);
  const [tipoEventos, setTipoEventos] = useState([]);

  const [notifyUser, setNotifyUser] = useState({});

  const [nomeEvento, setNomeEvento] = useState("");
  const [idInstituicao, setIdInstituicao] = useState("");
  const [dataEvento, setDataEvento] = useState("");
  const [descricaoEvento, setDescricaoEvento] = useState("");
  const [idTipoEventos, setIdTipoEventos] = useState("");
  const [idEvento, setIdEvento] = useState("")

// Metodo para componente dinamico
  // function fromEventToType(arrEvents) {
  //   if (arrEvents.length === 0) return []

  //   const arrAux = []

  //   arrEvents.foreach((e) => {
  //     arrAux.push(
  //       { value: e.idTipoEvento, text: e.titulo}
  //     )
  //   })

  //   return arrAux;
  // }

  // Lista

  async function getListaDeEventos() {
    try {
      const retornoGet = await api.get("/Evento/");

      setEvento(retornoGet.data);
    } catch (error) {
      alert("Falha ao listar os Eventos.");
    }
  }

  async function getTipoEventos() {
    try {
      const retornoGet = await api.get("/TiposEvento/");
      setTipoEventos(retornoGet.data)
    } catch (error) {
      alert("Falha ao listar os Eventos.");
    }
  }

  async function getInstituicoes() {
    try {
      const retornoGet = await api.get("/Instituicao/");
      setIdInstituicao(retornoGet.data[0].idInstituicao);
    } catch (error) {
      alert("Falha ao listar os Eventos.");
    }
  }

  useEffect(() => {
    async function getDados() {
      await getInstituicoes();
      await getTipoEventos();
      await getListaDeEventos();
    }
    
    getDados()
  }, []);

  // Excluir
  async function handleDelete(idEvento) {
    try {
      const retornoDelete = await api.delete(`/Evento/${idEvento}`);
      console.log(retornoDelete);
      getListaDeEventos();

      setNotifyUser({
        titleNote: "Sucesso",
        textNote: "Evento Excluído com Sucesso !!",
        imgIcon: "sucess",
        imgAlt:
          "imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
        showMessage: true,
      });
    } catch (error) {
      setNotifyUser({
        titleNote: "Falha ao Excluir",
        textNote: `Falha ao excluir o Evento.`,
        imgIcon: "danger",
        imgAlt: "Imagem representando a Falha ao executar a Ação.",
        showMessage: true,
      });
    }
  }

  //Cadastrar

  async function handleSubmit() {
    try {
      const retornoSubmit = await api.post("/Evento", {
        nomeEvento: nomeEvento,
        idTipoEvento: idTipoEventos,
        dataEvento: dataEvento,
        idInstituicao: idInstituicao,
        descricao: descricaoEvento,
      });
      console.log(retornoSubmit);
      getListaDeEventos();
    } catch (error) {
      console.log("Falha ao Cadastrar");
    }
  }

  // Update

  async function handleUpdate() {
    try {
      const retornoUpdate = await api.put(`/Evento/${idEvento}`, {
        nomeEvento: nomeEvento,
        idTipoEvento: idTipoEventos,
        dataEvento: dataEvento,
        idInstituicao: idInstituicao,
        descricao: descricaoEvento,
      });
      console.log(retornoUpdate);
      getListaDeEventos();
    } catch (error) {
      alert("Falha ao Atualizar");
    }
  }

  // Cancelar Update
  function editActionAbort() {
    setFrmEdit(false);

  }

  // Mostrar Tela de edição
  function showUpdateForm(e) {
    setFrmEdit(true);
    setIdEvento(e.idEvento)
  }

  return (
    <MainContent>
      <Notification {...notifyUser} setNotifyUser={setNotifyUser} />

      <section className="cadastro-evento-section">
        <Container>
          <div className="cadastro-evento__box">
            <Title tittleText={"Eventos"} additionalClass="Margem Acima" />

            <ImageIllustrator imageRender={eventImage} alterText="imagem" />

            <form
              className="ftipo-evento"
              onSubmit={frmEdit ? handleUpdate : handleSubmit}
            >
              {!frmEdit ? (
                <>
                  <Input
                    type={"text"}
                    placeholder={"Nome"}
                    id={"nome"}
                    name={"nome"}
                    required={"required"}
                    value={nomeEvento}
                    manipulationFunction={(e) => {
                      setNomeEvento(e.target.value);
                    }}
                  />

                  <Input
                    type={"text"}
                    placeholder={"Descricao"}
                    id={"descricao"}
                    name={"descricao"}
                    required={"required"}
                    manipulationFunction={(e) => {
                      setDescricaoEvento(e.target.value);
                    }}
                    value={descricaoEvento}
                  />

                  <Select
                    dados={tipoEventos}
                    name="tipo-evento"
                    id="tipo-evento"
                    required
                    manipulationFunction={(e) => {
                      setIdTipoEventos(e.target.value);
                    }}
                    defaultValue={idTipoEventos}
                  />

                  <Input
                    type={"date"}
                    id={"data"}
                    placeholder="data"
                    name={"data"}
                    required={"required"}
                    manipulationFunction={(e) => {
                      setDataEvento(e.target.value);
                    }}
                    value={dataEvento}
                  />

                  <Button
                    type={"submit"}
                    id={"submitEvento"}
                    name={"submitEvento"}
                    textButton={"Cadastro"}
                    additionalClass={"btn-cadastro"}
                  />
                </>
              ) : (
                <>
                  <Input
                    type={"text"}
                    placeholder={"Nome"}
                    id={"nome"}
                    name={"nome"}
                    required={"required"}
                    value={nomeEvento}
                    manipulationFunction={(e) => {
                      setNomeEvento(e.target.value);
                    }}
                  />

                  <Input
                    type={"text"}
                    placeholder={"Descricao"}
                    id={"descricao"}
                    name={"descricao"}
                    required={"required"}
                    manipulationFunction={(e) => {
                      setDescricaoEvento(e.target.value);
                    }}
                    value={descricaoEvento}
                  />

                  <Select
                    dados={tipoEventos}
                    name="tipo-evento"
                    id="tipo-evento"
                    required
                    manipulationFunction={(e) => {
                      setIdTipoEventos(e.target.value);
                    }}
                    defaultValue={idTipoEventos}
                  />

                  <Input
                    type={"date"}
                    id={"data"}
                    placeholder="data"
                    name={"data"}
                    required={"required"}
                    manipulationFunction={(e) => {
                      setDataEvento(e.target.value);
                    }}
                    value={dataEvento}
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

      <section className="lista-eventos-section">
        <Container>
          <Title titleText={"Lista De Eventos"} color={"white"} />

          <TableTpE
            dados={evento}
            fnDelete={handleDelete}
            fnUpdate={showUpdateForm}
          />
        </Container>
      </section>
    </MainContent>
  );
};

export default EventosPage;
