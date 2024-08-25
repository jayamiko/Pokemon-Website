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
import ButtonType from "../components/button/ButtonType";
import calculateCountdown from "../service/countdown";
import useAutoDismissAlert from "../hook/useAutoDismissAlert";

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

  const [lastAttempt, setLastAttempt] = useState(null); // session date if failed to caught
  const [timeRemaining, setTimeRemaining] = useState("");

  const [nickname, setNickname] = useState("");
  const [nicknameForm, setNicknameForm] = useState("");

  const [isCaught, setIsCaught] = useState(false);
  const [catchIsSuccess, setCatchIsSuccess] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [releaseIsSuccess, setReleaseIsSuccess] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);

  const { success, renamedPokemon, renameCount, releaseResponse, loading } =
    useSelector((state) => state.pokemon);

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
      setLastAttempt(pokemonByName?.last_attempt);
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
      const updatedFavorites = myPokemonList?.filter(
        (pokemon) => pokemon.name !== name
      );

      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
  }, [releaseResponse, name, myPokemonList]);

  useEffect(() => {
    if (releaseIsSuccess) {
      setNickname("");
      setIsCaught(false);
    }
  }, [releaseIsSuccess]);

  useAutoDismissAlert(showAlert, setShowAlert);
  useAutoDismissAlert(catchIsSuccess !== null, setCatchIsSuccess, null);
  useAutoDismissAlert(releaseIsSuccess !== null, setReleaseIsSuccess, null);

  const updateMyPokemonList = (updatedList) => {
    setMyPokemonList(updatedList);
    localStorage.setItem("favorites", JSON.stringify(updatedList));
  };

  const handleAddNickname = (e, name) => {
    e.preventDefault();
    if (!nicknameForm) return;

    const currentFavorites =
      JSON.parse(localStorage.getItem("favorites")) || [];

    const updatedFavorites = currentFavorites?.map((pokemon) => {
      if (pokemon.name === name) {
        return {
          ...pokemon,
          nickname: nicknameForm,
        };
      }
      return pokemon;
    });

    updateMyPokemonList(updatedFavorites);

    setNicknameForm("");
    setShowModal(false);
  };

  const pokemonName = pokemonDetail?.name;

  useEffect(() => {
    if (lastAttempt) {
      const lastAttemptDate = new Date(lastAttempt);

      const interval = setInterval(() => {
        const { hours, minutes, seconds } = calculateCountdown(lastAttemptDate);

        if (hours === 0 && minutes === 0 && seconds === 0) {
          clearInterval(interval);
        } else {
          const message = `You can catch this pokemon again in ${hours} hours ${minutes} minutes ${seconds} seconds`;

          setTimeRemaining(message);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [lastAttempt]);

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
          <div className="w-full flex flex-col">
            <div className="flex justify-center sm:justify-start items-end">
              <h1 className="uppercase font-bold text-xl sm:text-2xl md:text-3xl xl:text-5xl text-sky-700">
                {name}
              </h1>
              <span className="text-base sm:text-lg lg:text-xl italic ml-2 lowercase">
                {nickname && `(nickname: ${nickname})`}
              </span>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="w-fit flex space-x-2 items-center">
                {pokemonDetail?.types?.map((type, i) => {
                  return <ButtonType key={i} typeName={type} disabled={true} />;
                })}
              </div>
              <div className="space-x-4 text-xs sm:text-sm md:text-base">
                <span>height: {pokemonDetail.height}cm</span>
                <span>Weight: {pokemonDetail.weight}kg</span>
              </div>
            </div>
          </div>

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
          {nickname && (
            <div className="flex items-center space-x-4 mt-3">
              <button
                onClick={() => {
                  setShowRenameModal(true);
                }}
                className="bg-orange-500 hover:bg-orange-600 text-white w-40 font-bold capitalize rounded-md shadow-lg py-1"
              >
                Rename
              </button>
              <ModalForm
                title="Rename Nickname"
                showModal={showRenameModal}
                setShowModal={setShowRenameModal}
              >
                <NicknameForm
                  nickname={nicknameForm}
                  setNickname={setNicknameForm}
                  onSubmit={(e) => {
                    e.preventDefault();
                    dispatch(
                      renamePokemon({
                        pokemonName: name,
                        newName: nicknameForm,
                      })
                    );
                    setShowRenameModal(false);
                  }}
                />
              </ModalForm>
              <button
                onClick={() => {
                  dispatch(releasePokemon(setReleaseIsSuccess));
                }}
                disabled={loading || releaseIsSuccess !== null}
                className={`${
                  loading || releaseIsSuccess !== null
                    ? "opacity-60"
                    : "opacity-100"
                } bg-red-500 hover:bg-red-600 text-white w-40 font-bold capitalize rounded-md shadow-lg py-1`}
              >
                Release
              </button>
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

            {!isCaught ? (
              <div className="w-full flex justify-center md:justify-end items-center md:space-x-5">
                {showAlert ? (
                  <AlertNotification
                    text={
                      success
                        ? `${pokemonName} has been successfully caught`
                        : `Pokemon failed to catch, try another time`
                    }
                    variant={success ? VARIANT.Success : VARIANT.Failed}
                  />
                ) : (
                  pokemonExist &&
                  timeRemaining && (
                    <AlertNotification
                      text={timeRemaining}
                      variant={VARIANT.Warning}
                    />
                  )
                )}

                {!pokemonExist && (
                  <button
                    onClick={() => {
                      dispatch(
                        catchPokemon({
                          pokemonDetail,
                          setCatchIsSuccess,
                          setShowModal,
                        })
                      );
                      setShowAlert(true);
                    }}
                    disabled={loading || showAlert}
                    className={`${
                      loading || showAlert ? "opacity-60" : "opacity-100"
                    } bg-sky-600 border-2 hover:bg-sky-700 text-white w-full md:w-48 lg:w-52 font-bold capitalize rounded-lg shadow-lg py-2`}
                  >
                    CATCH
                  </button>
                )}
              </div>
            ) : (
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
