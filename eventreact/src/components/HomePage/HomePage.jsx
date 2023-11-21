import React, { useEffect, useState } from "react";
import "./HomePage.css";
import MainContent from "../MainContent/MainContent";
import Banner from "../Banner/Banner";
import VisionSection from "../VisionSection/VisionSection";
import ContactSection from "../ContactSection/ContactSection";
import NextEvent from "../NextEvent/NextEvent";
import container from "../container/Container";
import Title from "../Pages/Title";
import Container from "../container/Container";
import axios from "axios";
import api from "../../Services/Services";

const HomePage = () => {
  useEffect(() => {
    async function getProximosEventos() {
      try {
        const promise = await api.get("/Evento/ListarProximos");

        setNextEvents(promise.data);
      } catch (error) {
        alert("Falha na Api");
      }
    }

    getProximosEventos();
    console.log("A Home foi Montada !");
  }, []);

  //fake mock - api mocada
  const [nextEvents, setNextEvents] = useState([]);

  return (
    <MainContent>
      <Banner />

      <section className="proximos-eventos">
        <Container>
          <Title titleText={"Próximos Eventos"} />

          <div className="events-box">
            {nextEvents.map((e) => {
              return (
                <NextEvent
                  title={e.nomeEvento}
                  description={e.descricao.substr(0, 18)}
                  eventDate={e.dataEvento}
                  idEvento={e.idEvento}
                />
              );
            })}
          </div>
        </Container>
      </section>
      <VisionSection />
      <ContactSection />
    </MainContent>
  );
};

export default HomePage;
