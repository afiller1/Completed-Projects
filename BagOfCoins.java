public class BagOfCoins {

    public static final int DEFAULT_COIN_COUNT = 1000;
    public static final java.lang.String UNEVEN_PARTITION_MESSAGE = "Partition count must evenly divide the total number of bag throws.";
    int coinCount;
    Coin[] coinArray;
    int partitionCount;


    public BagOfCoins() {
        this.coinCount = DEFAULT_COIN_COUNT;
        this.coinArray = new Coin[DEFAULT_COIN_COUNT];
        for(int i = 0; i < DEFAULT_COIN_COUNT; i++) {

            this.coinArray[i] = new Coin();

        }
    }

    public BagOfCoins(int coinCount) {
        this.coinCount = coinCount;
        this.coinArray = new Coin[coinCount];
        for(int i = 0; i < coinCount; i++) {

            this.coinArray[i] = new Coin();

        }
    }

    public BagOfCoins(double bias) {
        this.coinCount = DEFAULT_COIN_COUNT;
        this.coinArray = new Coin[DEFAULT_COIN_COUNT];
        for(int i = 0; i < DEFAULT_COIN_COUNT; i++) {

            this.coinArray[i] = new Coin(bias);

        }

    }

    public BagOfCoins(int coinCount, double bias) {
        this.coinCount = coinCount;
        this.coinArray = new Coin[coinCount];
        for(int i = 0; i < coinCount; i++) {
            // Put new coins in the array.
            this.coinArray[i] = new Coin(bias);
        }
    }




// **********METHODS***********
    public int getCoinCount() {
        return coinCount;
    }

    public Coin getCoin(int index) {
        return coinArray[index];
    }

    public void throwCoins() {
        for(int i = 0; i < coinCount; i++) {
            coinArray[i].flip();
        }
    }

    public void resetCoins() {
        for(int i = 0; i < coinCount; i++) {
            coinArray[i].reset();
        }

    }

    public long[] getFlipTotals() {
        long cumulativeHeads = 0;
        long cumulativeTails = 0;
        for(int i = 0; i < coinCount; i++) {
            long headNumber = coinArray[i].getHeadCount();
            cumulativeHeads = cumulativeHeads + headNumber;
            long tailsNumber = coinArray[i].getTailCount();
            cumulativeTails = cumulativeTails + tailsNumber;
        }
        long[] answerArray = new long[] {cumulativeHeads, cumulativeTails};
        return answerArray;

    }

    public int[] getFlipHistogram(int partitionCount) {
        this.partitionCount = partitionCount;
        long[] flipTotalArray = getFlipTotals();
        long totalFlips = flipTotalArray[0] + flipTotalArray[1];
        int usableTotalFlips = (int) totalFlips;
        long numberOfThrows = totalFlips / coinCount;
        int usableNumberOfThrows = (int) numberOfThrows; // this is one.
        int goodPartitionTest = usableNumberOfThrows % partitionCount;
        int partitionSize = usableNumberOfThrows / partitionCount;
        int[] partitionArray = new int[partitionCount];

        if (goodPartitionTest != 0) {

            throw new IllegalArgumentException(UNEVEN_PARTITION_MESSAGE);
        }

        for(int i = 0; i < coinCount; i++) {
            long headCount = coinArray[i].getHeadCount();
            int usableHeadCount = (int) headCount;
            int partitionSpot = usableHeadCount / partitionSize;

            partitionArray[partitionSpot] += 1;

        }

          return partitionArray;
    }
}
