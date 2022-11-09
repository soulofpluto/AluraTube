import config from "../config.json";
import styled from "styled-components";
import { CSSReset } from "../src/components/CSSReset";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";
import { StyledFavorites } from "../src/components/Favorites";
import React from "react";

function HomePage() {
  //*const mensagem = "Bem-vindo ao Aluratube!";
  const estilosDaHomePage = {
    // backgroupColor: "Red"
  };
  const [valorDoFiltro, setValorDoFiltro] = React.useState(""); 

  //*console.log(config.playlist);

  return (
    <>
      <CSSReset />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: "1",
          // backgroundColor: "red"
        }}
      >
        <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro} />
        <Header />
        <Timeline searchValue={valorDoFiltro} playlists={config.playlist}>Contúdo</Timeline>
        <Favorites favorites={config.favorites} />
      </div>
    </>
  );
}

export default HomePage;

// function Menu() {
//   return <div>Menu</div>;
//}

const StyledHeader = styled.div`
  .user-info {
    margin-top: 50px;
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px 32px;
    gap: 16px;

    .user-info > img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
  }
`;

const ImageBanner = styled.img`
  width: 100%;
  height: 230px;
  object-fit: cover;
`;
const ImagePerfil = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
`;

function Header() {
  return (
    <StyledHeader>
      <ImageBanner src={config.banner} />
      <section className="user-info">
        <ImagePerfil src={`https://github.com/${config.github}.png`} />
        <div>
          <h2>{config.name}</h2>
          <p>{config.job}</p>
        </div>
      </section>
    </StyledHeader>
  );
}

function Timeline({ searchValue, ...propriedades }) {
  // console.log("Dentro do componente", propriedades.playlists);
  const playlistNames = Object.keys(propriedades.playlists);
  // Statement
  // Retorno por expressão
  return (
    <StyledTimeline>
      {playlistNames.map((playlistName) => {
        const videos = propriedades.playlists[playlistName];
        // console.log(playlistName);
        // console.log(videos);
        return (
          <section key={playlistName}>
            <h2>{playlistName}</h2>
            <div>
              {videos
                .filter((video) => {
                  const titleNormalized = video.title.toLowerCase();
                  const searchValueNormalized = searchValue.toLowerCase();
                  return titleNormalized.includes(searchValueNormalized);
                })
                .map((video) => {
                  return (
                    <a key={video.url} href={video.url}>
                      <img src={video.thumb} />
                      <span>{video.title}</span>
                    </a>
                  );
                })}
            </div>
          </section>
        );
      })}
    </StyledTimeline>
  );
}

function Favorites(props) {
  const favoritesAccounts = Object.keys(props.favorites);

  return (
    <StyledFavorites>
      <div>
        {favoritesAccounts.map((favoriteAccount) => {
          const accounts = props.favorites[favoriteAccount];
          return (
            <section>
              <h2>{favoriteAccount}</h2>
              <div className="account">
                {accounts.map((account) => {
                  return (
                    <a href="{`https://github.com/${account.perfl}`}">
                      <img src={`https://github.com/${account.perfil}.png`} />
                      <span>{account.perfil}</span>
                    </a>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </StyledFavorites>
  );
}
