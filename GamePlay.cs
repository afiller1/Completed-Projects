using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;


public class GamePlay : MonoBehaviour {

    // BUTTONS
    public GameObject StartBtn;
    public GameObject InstructionBtn;
    public GameObject MainMenuBtn1;
    public GameObject MainMenuBtn2;
    public GameObject MyDealBtn;
    public GameObject OppDealBtn;
    public GameObject StealBtn;
    public GameObject OppTurnBtn;
    public GameObject NextInstBtn;
    public GameObject PrevInstBtn;
    public GameObject EndTurnBtn;
    public GameObject NextRoundBtn;
    public GameObject NextLoopBtn;
    public GameObject CalculateScoresBtn;
    public GameObject EndGameScreen;
    public GameObject OpponentTurnButton;

    public int tableCardNum;
    Card[] cardsOnTable;

    // TEXTS
    public Text ChooseDealerText;
    public Text MyScoreLabel;
    public Text OppScoreLabel;
    public Text TallyTxt;
    public Text CardWinnerTxt;
    public Text GoldWinnerText;
    public Text SBWinnerText;
    public Text SetantaWinnerTxt;
    public Text YourScopasTxt;
    public Text OppScopasTxt;
    public Text MyScoreTxt;
    public Text OppScoreTxt;
    public Text alertTxt;
    public Text ScopaTxt;
    public Text endGameTxt;


    // SCREENS
    public GameObject MainMenu;
    public GameObject InstructionPage1;
    public GameObject InstructionPage2;
    public GameObject BackgroundPage;

    // DECK
    public string[] cardSuits = new string[] { "Gold", "Clubs", "Swords", "Cups" };
    public string[] cardValues = new string[] { "1", "2", "3", "4", "5", "6", "7", "8", "9", "10" };
    public int[] cardPointValues = new int[] { 16, 12, 13, 14, 15, 18, 21, 10, 10, 10 };
    public int[] cardNumValues = new int[] { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };
    public Card CardPrefab;
    public Card[] deck = new Card[40];
    //private int cardXStart = 400;
    private int cardYStart = -800;
    public GameObject dealtCardParent;
    // public Card[] createdCards = new Card[50];
    private Card[] cards;

    // WON CARDS
    public Card[] playerWonCards;
    public Card[] oppWonCards;
    public Card droppedCard;

    // OTHER
    private int deckSpot = 10;
    public GameObject MyHand;
    private GameObject OppHand;
    public GameObject Table;
    public static string player;
    bool myDeal;
    public int myScore = 0;
    public int oppScore = 0;
    int increment;
    int cardTally;
    int count;
    int oppCount;
    int myScopas;
    int oppScopas;
    int oppHandNum;
    Card[] arrayOppHand;
    int cardsInDeck;
    int checker = 0;
    bool oneTime = false;
    int counter = 0;


    // Use this for initialization
    void Start()
    {
        MainMenu.SetActive(true);
        InstructionPage1.SetActive(false);
        InstructionPage2.SetActive(false);
        MyHand = GameObject.FindGameObjectWithTag("MyHand");
        OppHand = GameObject.FindGameObjectWithTag("OpponentHand");
        Table = GameObject.FindGameObjectWithTag("Table");
        oppWonCards = new Card[40];
        playerWonCards = new Card[40];
        for (int i = 0; i < 40; i++)
        {
            oppWonCards[i] = null;
            playerWonCards[i] = null;
        }

        myScore = 0;
        oppScore = 0;
        increment = 0;
        cardTally = 0;
        count = 0;
        oppCount = 0;
        myScopas = 0;
        oppScopas = 0;
        cardsInDeck = 40;
        NextLoopBtn.gameObject.SetActive(false);
        OpponentTurnButton.SetActive(false);
        counter = 0;
}

    // BUTTON METHODS
    public void StartGame ()
    {
        MainMenu.SetActive(false);
        MyScoreTxt.text = myScore.ToString();
        OppScoreTxt.text = oppScore.ToString();
        MyScoreTxt.gameObject.SetActive(true);
        OppScoreTxt.gameObject.SetActive(true);
    }

    public void GetInstructions ()
    {
        InstructionPage1.SetActive(true);
        InstructionPage2.SetActive(false);
    }

    public void GetInstructions2()
    {
        InstructionPage2.SetActive(true);
    }

    public void GetMainMenu ()
    {
        InstructionPage1.SetActive(false);
        InstructionPage2.SetActive(false);
    }

    public void StartMyDeal ()
    {
        MyDealBtn.SetActive(false);
        OppDealBtn.SetActive(false);
        ChooseDealerText.gameObject.SetActive(false);
        OppScoreLabel.gameObject.SetActive(true);
        MyScoreLabel.gameObject.SetActive(true);

        cardYStart = 120;
        DealCards(ShuffleDeck(CreateDeck()));
        counter++;
        myDeal = true;
        OpponentTurnButton.SetActive(true);
    }

    public void StartOppDeal()
    {
        MyDealBtn.SetActive(false);
        OppDealBtn.SetActive(false);
        ChooseDealerText.gameObject.SetActive(false);
        OppScoreLabel.gameObject.SetActive(true);
        MyScoreLabel.gameObject.SetActive(true);
        counter++;
        cardYStart = 638;
        DealCards(ShuffleDeck(CreateDeck()));
        myDeal = false;
        OpponentTurnButton.SetActive(false);
        for (int i = 0; i < MyHand.transform.childCount; i++)
        {
            MyHand.transform.GetChild(i).GetComponent<CanvasGroup>().blocksRaycasts = true;
        }
    }

    public void NextLoop()
    {
        if(myDeal)
        {
            DealNextTurn(deck);
        } else
        {
            DealNextTurn(deck);
        }

        NextLoopBtn.gameObject.SetActive(false);
    }

    public void StealMyCards()
    {
        // makes an array of all the cards on the table
        Card[] tableCards = cardsOnTable;

        if (FindStealableCards())
        {
            for (int k = 0; k < tableCards.Length; k++)
            {
                if (tableCards[k].highlightSelected.activeSelf)
                {
                    playerWonCards[count] = tableCards[k];
                    tableCards[k].transform.SetParent(MainMenu.transform);
                    tableCards[k].gameObject.SetActive(false);
                    count++;
                }
            }

            playerWonCards[count] = droppedCard;
            playerWonCards[count].transform.SetParent(MainMenu.transform, false);
            count++;

        }

        
        droppedCard.GetComponent<CanvasGroup>().blocksRaycasts = true;
        droppedCard.gameObject.AddComponent<Stealable>();
        EndTurnBtn.SetActive(false);
        OpponentTurnButton.SetActive(true);
        //MakeOpponentTurn();

        cardTally = 0;
        oneTime = false;
    }

    // CREATES DECK OF CARDS
    public Card[] CreateDeck()
    {
        string cardName;

        Card indivCard;

        int amount = 0;

        for (int i = 0; i < cardSuits.Length; i++)
        {
            for (int k = 0; k < cardValues.Length; k++)
            {
                cardName = cardValues[k] + " of " + cardSuits[i];
                indivCard = GameObject.Instantiate(CardPrefab) as Card;

                indivCard.GetComponent<CanvasGroup>().blocksRaycasts = false;

                indivCard.transform.position = new Vector3(850, cardYStart, 0);

                indivCard.transform.SetParent(dealtCardParent.transform, false);

                indivCard.valueTxt.text = cardValues[k] + " of";
                indivCard.suitTxt.text = cardSuits[i];
                indivCard.numValue = cardNumValues[k];
                indivCard.pointValue = cardPointValues[k];

                if (indivCard.suitTxt.text.ToString().Equals("Gold"))
                {
                    indivCard.suitTxt.color = Color.yellow ;
                }

                deck[amount] = indivCard;
                deck[amount].back.SetActive(true);
                amount++;
            }
        }
        return deck;
    }

    // SHUFFLES NEWLY CREATED DECK OF CARDS
    // Note: this code came directly from my Euchre file
    public static Card[] ShuffleDeck (Card[] cards)
    {
        int j;
        int i;
        int numCards = cards.Length;

        Card tempSwap;

        for (i = 0; i < numCards - 1; i++)
        {
            j = Random.Range(i, numCards);
            tempSwap = cards[j];
            cards[j] = cards[i];
            cards[i] = tempSwap;
        }
        return cards;
    }

    public void DealCards(Card[] cards)
    {
        Card card;
        for (int i = 0; i < 3; i++)
        {
            card = cards[i];
            card.transform.SetParent(MyHand.transform);
            card.back.SetActive(false);
            card.startTag = "MyHand";
            card.GetComponent<CanvasGroup>().blocksRaycasts = true;
            //myHand.cards[i] = cards[i];
        }

        for (int i = 3; i < 6; i++)
        {
            card = cards[i];
            card.transform.SetParent(OppHand.transform);

            card.startTag = "OppHand";
            //myHand.cards[i] = cards[i];
        }

        for (int i = 6; i < 10; i++)
        {
            card = cards[i];
            card.transform.SetParent(Table.transform);
            card.back.SetActive(false);
            card.startTag = "Table";
            Destroy(card.gameObject.GetComponent<Draggable>());
            card.gameObject.GetComponent<Stealable>().enabled = true;
            //myHand.cards[i] = cards[i];
        }

        cardsInDeck -= 10;

    }
    public void DealNextTurn(Card[] deck)
    {
        Card card;
        if (deckSpot < 40)
        {
            for (int i = deckSpot; i < deckSpot + 3; i++)
            {

                card = deck[i];
                card.transform.SetParent(MyHand.transform);
                card.back.SetActive(false);
                card.startTag = "MyHand";
                card.GetComponent<CanvasGroup>().blocksRaycasts = true;
                card.GetComponent<Draggable>();

            }

            for (int i = deckSpot + 3; i < deckSpot + 6; i++)
            {
                card = deck[i];
                card.transform.SetParent(OppHand.transform);
                card.back.SetActive(true);
                card.startTag = "OppHand";
                card.GetComponent<CanvasGroup>().blocksRaycasts = false;
            }

            deckSpot += 6;
        }

    }

    public bool CheckRoundEnd()
    {
        return (MyHand.transform.childCount == 0 && OppHand.transform.childCount == 0 && deckSpot >= 10 && counter > 0);
    }

    public bool IsPlayersTurn()
    {
        return player == "player";
    }

    public void SwitchTurn ()
    {
        if (player == "player")
        {
            player = "opp";
        } else
        {
            player = "player";
        }
    }

    public void MakeCardsStealable()
    {
        int numTableCards = Table.transform.childCount - 1;
        Card[] tableCards = new Card[10];
        int droppedValue = droppedCard.numValue;

        // creates the array of all the cards on the table, not including the dropped card!!!!
        for (int i = 0; i < numTableCards; i++)
        {
            // Transform child = Table.transform.GetChild(i);
            // Card tableCard = child.GetComponent<Card>();
            tableCards[i] = Table.transform.GetChild(i).GetComponent<Card>();
            tableCards[i].GetComponent<CanvasGroup>().blocksRaycasts = true;
        }
    }

    public bool FindMatchingCard ()
    {
        int numTableCards = tableCardNum;
        Card[] tableCards = cardsOnTable;
        int droppedValue = droppedCard.numValue;
        int counterValue = 0;
        int truth = 0;

        // CASE 1: There's a card = to the one dropped on the table.
        for (int i = 0; i < numTableCards - 1; i++)
        {
            counterValue = droppedValue;
            if (tableCards[i].numValue == droppedValue)
            {
                truth++;
            }
        }

        counterValue = 0;
        return truth > 0;
    }

    public bool FindStealableCards()
    {
        if (FindMatchingCard())
        {
            return true;
        } else
        {
            int numTableCards = tableCardNum;
            Card[] tableCards = cardsOnTable;
            int droppedValue = droppedCard.numValue;
            int counterValue = 0;

            // CASE 1: There's a card = to the one dropped on the table.

            for (int i = 0; i < numTableCards - 1; i++)
            {
                counterValue = droppedValue;

                if (tableCards[i].numValue < droppedValue && (i+1) < numTableCards -1)
                {
                    for (int k = i + 1; k < numTableCards -1; k++)
                    {
                        counterValue = droppedValue - tableCards[i].numValue;
                        if ((counterValue - tableCards[k].numValue) == 0)
                        {
                            return true;
                        }
                        else if ((counterValue - tableCards[k].numValue) < droppedValue && (i+2) < numTableCards -1)
                        {
                            for (int q = k + 1; q < numTableCards-1; q++)
                            {
                                counterValue = droppedCard.numValue - tableCards[i].numValue - tableCards[k].numValue;
                                if ((tableCards[q].numValue) - counterValue == 0)
                                {
                                    return true;
                                }
                            }
                        }
                    }
                }
            }
        }
        return false;
    }

    public void CalculateWinners ()
    {
        for (int i = 0; i < cardsOnTable.Length; i++)
        {
            cardsOnTable[i].transform.SetParent(MainMenu.transform);
        }

        /*
    public Text YourScopasTxt;
    public Text OppScopasTxt;
    */
        int county = 0;
        int counteroo = 0;
        for (int i = 0; playerWonCards[i] != null; i++)
        {
            county++;
        }

        for (int i = 0; oppWonCards[i] != null; i++)
        {
            counteroo++;
        }

        Card[] playerWon = new Card[county];
        Card[] oppWon = new Card[counteroo];

        for (int i = 0; i < county; i++)
        {
            playerWon[i] = playerWonCards[i];
        }

        for (int i = 0; i < counteroo; i++)
        {
            oppWon[i] = oppWonCards[i];
        }

        // Cards winner:
        if (county > counteroo)
        {
            CardWinnerTxt.text = "Me";
            myScore++;
        } else if (counteroo < county)
        {
            CardWinnerTxt.text = "Opponent";
            oppScore++;
        } else
        {
            CardWinnerTxt.text = "Tie";
        }

        // Setanta winner
        int sbCount = 0;
        int goldCount = 0;
        Card[] playerGold = new Card[10];
        Card[] playerClubs = new Card[10];
        Card[] playerSwords = new Card[10];
        Card[] playerCups = new Card[10];
        Card[] oppGold = new Card[10];
        Card[] oppClubs = new Card[10];
        Card[] oppSwords = new Card[10];
        Card[] oppCups = new Card[10];

        // make an array for each suit
        int k = 0;
        int r = 0;
        int g = 0;
        int p = 0;
        for (int i = 0; i < county; i++)
        {

            if (playerWon[i].suitTxt.text.ToString().Equals("Gold"))
            {
                playerGold[k] = playerWon[i];
                k++;
            }
            if (playerWon[i].suitTxt.text.ToString().Equals("Cups"))
            {
                playerCups[r] = playerWon[i];
                r++;
            }
            if (playerWon[i].suitTxt.text.ToString().Equals("Swords"))
            {
                playerSwords[g] = playerWon[i];
                g++;
            }
            if (playerWon[i].suitTxt.text.ToString().Equals("Clubs"))
            {
                playerClubs[p] = playerWon[i];
                p++;
            }
        }
        goldCount = k;
        // find best of each suit
        int bestG = 0;
        int bestC = 0;
        int bestS = 0;
        int bestCl = 0;

        if (k > 0)
        {
            bestG = playerGold[0].pointValue;
            for (int i = 1; playerGold[i] != null; i++)
            {
                if (playerGold[i].pointValue > playerGold[i - 1].pointValue)
                {
                    bestG = playerGold[i].pointValue;
                }
                if (playerGold[i].numValue == 7)
                {
                    sbCount++;
                }
            }
        }
        if (r > 0)
        {
            bestC = playerCups[0].pointValue;
            for (int i = 1; playerCups[i] != null; i++)
            {
                if (playerCups[i].pointValue > playerCups[i - 1].pointValue)
                {
                    bestC = playerCups[i].pointValue;
                }
            }
        }
        if (g > 0)
        {
            bestS = playerSwords[0].pointValue;
            for (int i = 1; playerSwords[i] != null; i++)
            {
                if (playerSwords[i].pointValue > playerSwords[i - 1].pointValue)
                {
                    bestS = playerSwords[i].pointValue;
                }
            }
        }
        if (p > 0)
        {
            bestCl = playerClubs[0].pointValue;
            for (int i = 1; playerClubs[i] != null; i++)
            {
                if (playerClubs[i].pointValue > playerClubs[i - 1].pointValue)
                {
                    bestCl = playerClubs[i].pointValue;
                }
            }
        }

        int playerPrime = bestG + bestC + bestS + bestCl;

        int l = 0;
        int m = 0;
        int n = 0;
        int o = 0;

        for (int i = 0; i < counteroo; i++)
        {
            if (oppWon[i].suitTxt.text.ToString().Equals("Gold"))
            {
                oppGold[l] = oppWonCards[i];
                l++;
            }
            if (oppWon[i].suitTxt.text.ToString().Equals("Cups"))
            {
                oppCups[m] = oppWonCards[i];
                m++;
            }
            if (oppWon[i].suitTxt.text.ToString().Equals("Swords"))
            {
                oppSwords[n] = oppWonCards[i];
                n++;
            }
            if (oppWon[i].suitTxt.text.ToString().Equals("Clubs"))
            {
                oppClubs[o] = oppWonCards[i];
                o++;
            }
        }

        // find best of each suit
        int bestOppG = 0;
        int bestOppC = 0;
        int bestOppCl = 0;
        int bestOppS = 0;
        if (l > 0)
        {
            bestOppG = oppGold[0].pointValue;
            for (int i = 1; oppGold[i] != null; i++)
            {
                if (oppGold[i].pointValue > oppGold[i - 1].pointValue)
                {
                    bestOppG = oppGold[i].pointValue;
                }
            }
        }
        if (m > 0)
        {
            bestOppC = oppCups[0].pointValue;
            for (int i = 1; oppCups[i] != null; i++)
            {
                if (oppCups[i].pointValue > oppCups[i - 1].pointValue)
                {
                    bestOppC = oppCups[i].pointValue;
                }
            }
        }
        if (n > 0)
        {
            bestOppS = oppSwords[0].pointValue;
            for (int i = 1; oppSwords[i] != null; i++)
            {
                if (oppSwords[i].pointValue > oppSwords[i - 1].pointValue)
                {
                    bestOppS = oppSwords[i].pointValue;
                }
            }
        }
        if (o > 0)
        {
            bestOppCl = oppClubs[0].pointValue;
            for (int i = 1; oppClubs[i] != null; i++)
            {
                if (oppClubs[i].pointValue > oppClubs[i - 1].pointValue)
                {
                    bestOppCl = oppClubs[i].pointValue;
                }
            }
        }

        int oppPrime = bestOppG + bestOppC + bestOppS + bestOppCl;

        if (playerPrime > oppPrime)
        {
            SetantaWinnerTxt.text = "Me";
            myScore++;
        } else if (playerPrime < oppPrime)
        {
            SetantaWinnerTxt.text = "Opponent";
            oppScore++;
        } else
        {
            SetantaWinnerTxt.text = "Tie";
        }

        // Gold winner
        if (goldCount > 5)
        {
            GoldWinnerText.text = "Me";
            myScore++;
        } else if (goldCount < 5)
        {
            GoldWinnerText.text = "Opponent";
            oppScore++;
        } else
        {
            GoldWinnerText.text = "Tie";
        }

        // SB winner
        if (sbCount > 0)
        {
            SBWinnerText.text = "Me";
            myScore++;
        } else
        {
            SBWinnerText.text = "Opponent";
            oppScore++;
        }

        myScore += myScopas;
        oppScore += oppScopas;

        MyScoreTxt.text = myScore.ToString();
        OppScoreTxt.text = oppScore.ToString();
        
        TallyTxt.gameObject.SetActive(true);
        SBWinnerText.gameObject.SetActive(true);
        SetantaWinnerTxt.gameObject.SetActive(true);
        GoldWinnerText.gameObject.SetActive(true);
        CardWinnerTxt.gameObject.SetActive(true);
        MyScoreTxt.gameObject.SetActive(true);
        OppScoreTxt.gameObject.SetActive(true);
        YourScopasTxt.text = myScopas.ToString();
        OppScopasTxt.text = oppScopas.ToString();
        YourScopasTxt.gameObject.SetActive(true);
        OppScopasTxt.gameObject.SetActive(true);
        CalculateScoresBtn.gameObject.SetActive(false);
        NextRoundBtn.SetActive(true);
        ScopaTxt.gameObject.SetActive(false);
    }

    public void StartNextRound()
    {
        ClearEverything();
        NextRoundBtn.SetActive(false);
        //SwitchDealer();
        
        if (myScore >= 11 || oppScore >= 11)
        {
            EndGame();
        } else
        {
            if (myDeal)
            {
                StartOppDeal();
                return;
            }
            else
            {
                StartMyDeal();
                return;
            }
        }
        NextRoundBtn.gameObject.SetActive(false);
    }

    public void EndGame()
    {
        if (myScore > oppScore)
        {
            endGameTxt.text = "Game over, you win!";
        } else if (oppScore > myScore)
        {
            endGameTxt.text = "Game over, your opponent wins!";
        } else
        {
            endGameTxt.text = "Game over, you tied!";
        }

        EndGameScreen.SetActive(true);
    }

    public void MakeThisPlayable()
    {
        if (OpponentTurnButton.activeSelf)
        {
            for (int i = 0; i < MyHand.transform.childCount; i++)
            {
                MyHand.transform.GetChild(i).gameObject.GetComponent<CanvasGroup>().blocksRaycasts = false;
            }
        }
    }

    public void MakeThisPlayable2 ()
    {
        if (!OpponentTurnButton.activeSelf)
        {
            for (int i = 0; i < MyHand.transform.childCount; i++)
            {
                MyHand.transform.GetChild(i).gameObject.GetComponent<CanvasGroup>().blocksRaycasts = true;
            }
        }


    }

    public void MakeOpponentTurn()
    {
        ScopaTxt.gameObject.SetActive(false);
        OpponentTurnButton.SetActive(false);

        int numTableCards = tableCardNum;
        Card[] tableCards = cardsOnTable;
        //int numTableCards = Table.transform.childCount;

        Card OppPlayedCard;
        int counterValue = 0;

        Card[] OppHandArray = arrayOppHand;
        int numOppHand = oppHandNum;

        OppPlayedCard = OppHandArray[0];
        int OppDropVal = OppPlayedCard.numValue;

        OppPlayedCard.back.SetActive(false);
        //OppPlayedCard.transform.SetParent(Table.transform);
        for (int i = 0; i < numTableCards; i++)
        {
            counterValue = OppDropVal;
            if (tableCards[i].numValue == OppDropVal)
            {
                oppWonCards[oppCount] = tableCards[i];                
                oppWonCards[oppCount + 1] = OppPlayedCard;
                oppWonCards[oppCount].transform.SetParent(MainMenu.transform);
                oppWonCards[oppCount + 1].transform.SetParent(MainMenu.transform);
                tableCards[i].gameObject.SetActive(false);
                OppPlayedCard.gameObject.SetActive(false);
                alertTxt.text = "Your opponent dropped the " + OppPlayedCard.numValue + " of " + OppPlayedCard.suitTxt.text +
                    " and picked up the " + tableCards[i].numValue + " of " + tableCards[i].suitTxt.text + ".";
                alertTxt.gameObject.SetActive(true);
                oppCount += 2;
                increment++;
                return;
            } else if (tableCards[i].numValue < OppDropVal && (i+1) < numTableCards)
            {
                for (int k = i + 1; k < numTableCards; k++)
                {
                    counterValue = OppDropVal - tableCards[i].numValue;
                    if ((counterValue - tableCards[k].numValue) == 0)
                    {
                        oppWonCards[oppCount] = tableCards[i];
                        oppWonCards[oppCount + 1] = tableCards[k];
                        oppWonCards[oppCount + 2] = OppPlayedCard;
                        oppWonCards[oppCount].transform.SetParent(MainMenu.transform);
                        oppWonCards[oppCount + 1].transform.SetParent(MainMenu.transform);
                        OppPlayedCard.transform.SetParent(MainMenu.transform);
                        tableCards[i].gameObject.SetActive(false);
                        tableCards[k].gameObject.SetActive(false);
                        OppPlayedCard.gameObject.SetActive(false);
                        alertTxt.text = "Your opponent dropped the " + OppPlayedCard.numValue + " of " + OppPlayedCard.suitTxt.text +
                            " and picked up the " + tableCards[i].numValue + " of "
                            + tableCards[k].suitTxt.text + " and the " + tableCards[k].numValue + " of " +
                            tableCards[i].suitTxt.text + ".";
                        alertTxt.gameObject.SetActive(true);
                        //OppPlayedCard.GetComponent<CanvasGroup>().blocksRaycasts = true;
                        oppCount += 3;
                        return;
                    } else if ((counterValue - tableCards[k].numValue) > 0 && (i+2) < numTableCards)
                    {
                        counterValue = OppDropVal - tableCards[i].numValue - tableCards[k].numValue;
                        for (int q = k + 1; q < numTableCards; q++)
                        {
                            if ((counterValue - tableCards[q].numValue) == 0)
                            {
                                oppWonCards[oppCount] = tableCards[i];
                                oppWonCards[oppCount + 1] = tableCards[k];
                                oppWonCards[oppCount + 2] = tableCards[q];
                                oppWonCards[oppCount + 3] = OppPlayedCard;
                                oppWonCards[oppCount].transform.SetParent(MainMenu.transform);
                                oppWonCards[oppCount + 1].transform.SetParent(MainMenu.transform);
                                oppWonCards[oppCount + 2].transform.SetParent(MainMenu.transform);
                                OppPlayedCard.transform.SetParent(MainMenu.transform);
                                tableCards[i].gameObject.SetActive(false);
                                tableCards[k].gameObject.SetActive(false);
                                tableCards[q].gameObject.SetActive(false);
                                OppPlayedCard.gameObject.SetActive(false);
                                alertTxt.text = "Your opponent dropped the " + OppPlayedCard.numValue + " of " + OppPlayedCard.suitTxt.text +
                                    " and picked up the " + tableCards[i].numValue + " of "
                                    + tableCards[k].suitTxt.text + " and the " + tableCards[k].numValue + " of " +
                                    tableCards[i].suitTxt.text + ".";
                                alertTxt.gameObject.SetActive(true);
                                oppCount += 4;
                                increment++;
                                return;
                            }
                        }
                    }
                }

            }
        }

        OppPlayedCard.transform.SetParent(Table.transform);
        increment++;
        counterValue = 0;
        alertTxt.text = "Your opponent dropped the " + OppPlayedCard.numValue + " of " + OppPlayedCard.suitTxt.text + ".";
        alertTxt.gameObject.SetActive(true);
        Destroy(OppPlayedCard.gameObject.GetComponent<Draggable>());
        OppPlayedCard.gameObject.AddComponent<Stealable>();
        OppPlayedCard.GetComponent<CanvasGroup>().blocksRaycasts = true;
        oneTime = false;
    }


    public void SwitchHighlights(Card card)
    {
        if (card.highlightSelected.activeSelf)
        {
            card.highlightSelected.SetActive(false);
            cardTally -= card.numValue;
        }
        else if (!card.highlightSelected.activeSelf)
        {
            card.highlightSelected.SetActive(true);
            cardTally += card.numValue;
        }
    }

    public bool StateSelectionValidity()
    {
        bool cat = (cardTally == droppedCard.numValue);
        //cardTally = 0;
        return cat;
    }

    public void EnableEndButton()
    {

        if (StateSelectionValidity())
        {
            EndTurnBtn.SetActive(true);
            alertTxt.gameObject.SetActive(false);
        }
        else if (!FindStealableCards()) {
            EndTurnBtn.SetActive(true);
            alertTxt.gameObject.SetActive(false);
        }
        else
        {
            EndTurnBtn.SetActive(false);

        }
    }


    public bool CheckMyScopa()
    {
        return (Table.transform.childCount == 0 && OpponentTurnButton.activeSelf && deckSpot > 10);
    }

    public void itsMyScopa()
    {
        if (Table.transform.childCount == 0 && deckSpot > 10)
        {
            myScopas++;
            ScopaTxt.text = "You got a Scopa!";
            ScopaTxt.gameObject.SetActive(true);
        }
    }

    public bool CheckOppScopa()
    {
        return (Table.transform.childCount == 0 && !OppTurnBtn.activeSelf && deckSpot > 10 && !CalculateScoresBtn.activeSelf);

    }

    public void OppScopaTime()
    {
        if (Table.transform.childCount == 0 && deckSpot > 10)
        {
            oppScopas++;
            ScopaTxt.text = "Opponent got a Scopa!";
            ScopaTxt.gameObject.SetActive(true);
        }

    }


    public bool CheckDealerChangeTime()
    {
        return (MyHand.transform.childCount == 0 && OppHand.transform.childCount == 0 && deckSpot >= 40);
    }

    public void ClearEverything()
    {
        MainMenu.SetActive(false);
        InstructionPage1.SetActive(false);
        InstructionPage2.SetActive(false);
        BackgroundPage.SetActive(true);
        MyHand = GameObject.FindGameObjectWithTag("MyHand");
        OppHand = GameObject.FindGameObjectWithTag("OpponentHand");
        Table = GameObject.FindGameObjectWithTag("Table");
        oppWonCards = new Card[40];
        playerWonCards = new Card[40];
        for (int i = 0; i < 40; i++)
        {
            oppWonCards[i] = null;
            playerWonCards[i] = null;
        }

        increment = 0;
        cardTally = 0;
        count = 0;
        oppCount = 0;
        myScopas = 0;
        oppScopas = 0;
        cardsInDeck = 40;
        NextLoopBtn.gameObject.SetActive(false);
        deckSpot = 10;

        TallyTxt.gameObject.SetActive(false);
        SBWinnerText.gameObject.SetActive(false);
        SetantaWinnerTxt.gameObject.SetActive(false);
        GoldWinnerText.gameObject.SetActive(false);
        CardWinnerTxt.gameObject.SetActive(false);
        MyScoreTxt.gameObject.SetActive(false);
        OppScoreTxt.gameObject.SetActive(false);
        YourScopasTxt.gameObject.SetActive(false);
        OppScopasTxt.gameObject.SetActive(false);
        CalculateScoresBtn.gameObject.SetActive(false);
        NextRoundBtn.SetActive(false);
        checker = 0;
    }

    public void EraseRemainingCards()
    {
        for (int i = 0; i < Table.transform.childCount; i++)
        {
            Table.transform.GetChild(i).SetParent(MainMenu.transform);
        }
    }

    private void Update()
    {
        tableCardNum = Table.transform.childCount;

        cardsOnTable = new Card[tableCardNum];

        // Makes Table array
        for (int i = 0; i < tableCardNum; i++)
        {
            cardsOnTable[i] = Table.transform.GetChild(i).GetComponent<Card>();
        }

        oppHandNum = OppHand.transform.childCount;
        arrayOppHand = new Card[oppHandNum];

        // creates opphand array
        for (int i = 0; i < oppHandNum; i++)
        {
            arrayOppHand[i] = OppHand.transform.GetChild(i).GetComponent<Card>();
        }

        if (CheckRoundEnd() && deckSpot < 40)
        {
            NextLoopBtn.gameObject.SetActive(true);

        }

        if(CheckDealerChangeTime())
        {
            CalculateScoresBtn.gameObject.SetActive(true);
        }


        MakeThisPlayable();
        MakeThisPlayable2();

        MyScoreTxt.text = myScore.ToString();
        OppScoreTxt.text = oppScore.ToString();
        MyScoreTxt.gameObject.SetActive(true);
        OppScoreTxt.gameObject.SetActive(true);

    }
}
