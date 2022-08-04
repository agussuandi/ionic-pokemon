import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonList,
    IonItem,
    IonLabel,
    IonText
} from '@ionic/react'

export default function About()
{
    return (
        <IonPage>
            <IonHeader className="header-background">
                <IonToolbar>
                    <IonTitle>About</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonCard>
                    <IonCardContent>
                        <IonList>
                            <IonItem>
                                <IonLabel>
                                    <IonText>
                                        Version
                                    </IonText>
                                </IonLabel>
                                <IonLabel>
                                    <IonText>
                                        1.0.0
                                    </IonText>
                                </IonLabel>
                            </IonItem>
                            <IonItem>
                                <IonLabel>
                                    <IonText>   
                                        Author
                                    </IonText>
                                </IonLabel>
                                <IonLabel>
                                    <IonText>
                                        Agus Suandi
                                    </IonText>
                                </IonLabel>
                            </IonItem>
                            <IonItem>
                                <IonLabel>
                                    <IonText>   
                                        Email
                                    </IonText>
                                </IonLabel>
                                <IonLabel>
                                    <IonText>
                                        <a href="mailto:agussuandi48@gmail.com">agussuandi48@gmail.com</a>
                                    </IonText>
                                </IonLabel>
                            </IonItem>
                            <IonItem>
                                <IonLabel>
                                    <IonText>   
                                        Poke API
                                    </IonText>
                                </IonLabel>
                                <IonLabel>
                                    <IonText>
                                        <a href="https://pokeapi.co">Poke API</a>
                                    </IonText>
                                </IonLabel>
                            </IonItem>
                        </IonList>
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    );
}