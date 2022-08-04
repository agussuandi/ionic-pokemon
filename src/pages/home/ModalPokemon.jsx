import { 
    IonContent,
    IonModal,
    IonList,
    IonNote,
    IonItem,
    IonLabel,
    IonCard,
    IonCardContent,
    IonCardTitle,
    IonChip
} from '@ionic/react';

export default function ModalPokemon({modal, toggleModal, pokemonDetail})
{
    return (
        <IonModal isOpen={modal} trigger="open-modal" initialBreakpoint={0.5} breakpoints={[0, 0.25, 0.5, 0.75, 0.90]} onIonModalDidDismiss={toggleModal}>
            <IonContent className="ion-padding">
                {modal
                    ?
                        <>
                            <IonCard className={`${pokemonDetail.types[0].type.name} thumb-container`}>
                                <img src={pokemonDetail.sprites.other.dream_world.front_default} width="100" height="100" style={{display: 'block', margin: 'auto'}} />
                                <IonCardContent>
                                    <IonCardTitle style={{textAlign: 'center'}}>{pokemonDetail.name}</IonCardTitle>
                                </IonCardContent>
                            </IonCard>
                            <IonList>
                                <IonItem>
                                    {pokemonDetail.types.map((type, i) => (
                                        <IonChip key={i}>
                                            <IonLabel className={type.type.name}>{type.type.name}</IonLabel>
                                        </IonChip>
                                    ))}
                                </IonItem>
                            </IonList>
                            <IonList>
                                {pokemonDetail.stats.map((stat, i) => (
                                    <IonItem key={i}>
                                        <IonLabel>{stat.stat.name}</IonLabel>
                                        <IonNote slot="end">{stat.base_stat}</IonNote>
                                    </IonItem>
                                ))}
                            </IonList>
                        </>
                    :
                    <>
                        <p>Choose pokemon first</p>
                    </>
                }
            </IonContent>
        </IonModal>

    )
}