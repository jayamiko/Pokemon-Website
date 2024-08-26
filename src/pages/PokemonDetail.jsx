import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProgressBar from "../components/progress/ProgressBar";
import { useDispatch, useSelector } from "react-redux";
import {
  catchPokemon,
  releasePokemon,
  renamePokemon,
} from "../features/pokemon/pokemonSlice";
import LoaderPage from "../components/loading/LoaderPage";
import { STATUS, VARIANT } from "../utils/constants";
import VerticalTab from "../components/tab/VerticalTab";
import { getPokemonDetail } from "../features/pokemon/pokemonDetailSlice";
import ModalForm from "../components/modal/ModalForm";
import NicknameForm from "../components/form/NicknameForm";
import AlertNotification from "../components/alert/AlertNotification";
import Image from "../components/image/Image";
import useAutoDismissAlert from "../hook/useAutoDismissAlert";
import Button from "../components/button/Button";
import BoardInfo from "../components/card/BoardInfo";

function PokemonDetail() {
  const { name } = useParams();

  const dispatch = useDispatch();
  const pokemonDetail = useSelector(
    (state) => state.pokemonDetail?.pokemonData
  );

  const status = useSelector((state) => state.pokemonDetail?.status);

  const [myPokemonList, setMyPokemonList] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  const [pokemonExist, setPokemonExist] = useState({});

  const [nickname, setNickname] = useState("");
  const [nicknameForm, setNicknameForm] = useState("");

  const [isCaught, setIsCaught] = useState(false);
  const [catchIsSuccess, setCatchIsSuccess] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [releaseIsSuccess, setReleaseIsSuccess] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);

  const { renamedPokemon, renameCount, releaseResponse, loading } = useSelector(
    (state) => state.pokemon
  );

  useEffect(() => {
    if (name) {
      dispatch(getPokemonDetail(name));
    }
  }, [name, dispatch]);

  useEffect(() => {
    const myCollections = JSON.parse(localStorage.getItem("favorites")) || [];

    const pokemonByName = myCollections?.filter(
      (pokemon) => pokemon.name === name
    )[0];

    setPokemonExist(pokemonByName);
    setNickname(pokemonByName?.nickname);

    if (pokemonByName?.isCaught) {
      setIsCaught(true);
    } else {
      setIsCaught(false);
    }
  }, [name, myPokemonList, catchIsSuccess, releaseIsSuccess]);

  useEffect(() => {
    if (renamedPokemon && renameCount) {
      const updatedPokemon = myPokemonList?.map((pokemon) => {
        if (pokemon.name === name) {
          setNickname(renamedPokemon);
          return {
            ...pokemon,
            nickname: renamedPokemon,
            rename_count: renameCount,
          };
        }
        return pokemon;
      });

      localStorage.setItem("favorites", JSON.stringify(updatedPokemon));
    }
  }, [renamedPokemon, renameCount, myPokemonList, name]);

  useEffect(() => {
    if (releaseResponse?.isPrime) {
      const myPokemonList = JSON.parse(localStorage.getItem("favorites"));
      const updatedFavorites = myPokemonList?.filter(
        (pokemon) => pokemon.name !== name
      );

      console.log(JSON.stringify(updatedFavorites));

      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
  }, [releaseResponse, name]);

  useEffect(() => {
    if (releaseIsSuccess) {
      setNicknameForm("");
      setNickname("");
      setIsCaught(false);
    }
  }, [releaseIsSuccess]);

  useAutoDismissAlert(showAlert, setShowAlert);
  useAutoDismissAlert(catchIsSuccess !== null, setCatchIsSuccess, null);
  useAutoDismissAlert(releaseIsSuccess !== null, setReleaseIsSuccess, null);

  const handleCatchPokemon = () => {
    dispatch(
      catchPokemon({
        pokemonDetail,
        setCatchIsSuccess,
        setShowModal,
      })
    );
    setShowAlert(true);
  };

  const handleRenamePokemon = (e) => {
    e.preventDefault();
    dispatch(
      renamePokemon({
        pokemonName: name,
        newName: nicknameForm,
      })
    );
    setShowRenameModal(false);
  };

  const handleAddNickname = (e, name) => {
    e.preventDefault();
    if (!nicknameForm) return;

    const currentFavorites =
      JSON.parse(localStorage.getItem("favorites")) || [];

    console.log(pokemonExist);
    console.log(currentFavorites?.length > 0);
    if (currentFavorites?.length > 0) {
      const updatedFavorites = currentFavorites?.map((pokemon) => {
        if (pokemon.name === name) {
          return {
            ...pokemon,
            nickname: nicknameForm,
          };
        }
        return pokemon;
      });
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setMyPokemonList(updatedFavorites);
    }

    setNicknameForm("");
    setShowModal(false);
  };

  const pokemonName = pokemonDetail?.name;

  return (
    <section className="container mx-auto px-3 md:px-5">
      <section className="py-10 flex flex-col sm:flex-row items-center sm:items-start lg:space-x-20">
        <div className="lg:w-2/5 flex flex-col justify-center items-center">
          <Image
            src={pokemonDetail?.avatar}
            width={400}
            height={400}
            alt={name}
          />
        </div>
        <div className="w-full lg:w-3/5 lg:ml-10">
          <BoardInfo item={pokemonDetail} nickname={nickname} />

          {/* Show Modal after Catch is success */}
          <ModalForm
            title={`Give ${pokemonName} a Nickname`}
            showModal={showModal}
            setShowModal={setShowModal}
          >
            <NicknameForm
              nickname={nicknameForm}
              setNickname={setNicknameForm}
              onSubmit={(e) => handleAddNickname(e, name)}
            />
          </ModalForm>

          {/* Show These butons when the pokemon has a nickname */}
          {nickname && !showModal && (
            <div className="flex items-center space-x-4 mt-3">
              <Button
                onClick={() => {
                  setShowRenameModal(true);
                }}
                classNames="bg-orange-500 hover:bg-orange-600"
              >
                Rename
              </Button>
              <ModalForm
                title="Rename Nickname"
                showModal={showRenameModal}
                setShowModal={setShowRenameModal}
              >
                <NicknameForm
                  nickname={nicknameForm}
                  setNickname={setNicknameForm}
                  onSubmit={handleRenamePokemon}
                />
              </ModalForm>
              <Button
                onClick={() => {
                  dispatch(releasePokemon(setReleaseIsSuccess));
                }}
                classNames={`${
                  loading || releaseIsSuccess !== null
                    ? "opacity-60"
                    : "opacity-100"
                } bg-red-500 hover:bg-red-600`}
                disabled={releaseIsSuccess !== null || loading}
              >
                Release
              </Button>
            </div>
          )}

          {/* POKEMON STATS */}
          <div className="w-full mt-3">
            {pokemonDetail?.stats?.map((stat, i) => {
              return (
                <ProgressBar
                  key={i}
                  index={i}
                  label={stat?.name}
                  percent={stat?.value}
                />
              );
            })}

            <div
              className={`w-full flex flex-col-reverse sm:flex-row ${
                showAlert ? "justify-between" : "justify-center md:justify-end"
              } items-center md:space-x-5`}
            >
              {showAlert && (
                <AlertNotification
                  text={
                    catchIsSuccess
                      ? `${pokemonName} has been successfully caught`
                      : `Pokemon failed to catch, try another time`
                  }
                  variant={catchIsSuccess ? VARIANT.Success : VARIANT.Failed}
                />
              )}

              {!pokemonExist && (
                <button
                  onClick={handleCatchPokemon}
                  disabled={loading || showAlert}
                  className={`${
                    loading || showAlert ? "opacity-60" : "opacity-100"
                  } bg-sky-600 border-2 hover:bg-sky-700 text-white w-full md:w-48 lg:w-52 font-bold capitalize rounded-lg shadow-lg py-2`}
                >
                  CATCH
                </button>
              )}
            </div>

            {!showModal && isCaught && (
              <AlertNotification
                text="You have already caught this Pokemon"
                variant={VARIANT.Info}
              />
            )}

            {releaseIsSuccess !== null && (
              <AlertNotification
                text={
                  releaseIsSuccess
                    ? `${name} release successful`
                    : `${name} failed to be released`
                }
                variant={releaseIsSuccess ? VARIANT.Success : VARIANT.Failed}
              />
            )}
          </div>
        </div>
      </section>

      <section id="tab" className="mt-3 md:mt-5">
        <VerticalTab item={pokemonDetail} />
      </section>
      {status === STATUS.Loading && <LoaderPage />}
    </section>
  );
}

export default PokemonDetail;
