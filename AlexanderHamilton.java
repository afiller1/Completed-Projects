public class AlexanderHamilton {
    public static final int DEFAULT_PARTITION_COUNT = 100;
    public static final int DEFAULT_COIN_COUNT = 1000;
    public static final double DEFAULT_BIAS = 0.5;
    public static final int DEFAULT_THROW_COUNT = 1000;
    int coinCount;
    BagOfCoins[] bagOfCoinsArray;

    public static String repeat(String stringToRepeat, int timesToRepeat) {
        if (timesToRepeat <= 0) return "";
        else return stringToRepeat + repeat(stringToRepeat, timesToRepeat-1);
    }


    public static void main(String[] args) {
        int[] inputs = new int[args.length];
        int[] answerArray;
        double biasInput;
        int coinCountInput;
        int throwCountInput;
        int partitionCountInput;
        BagOfCoins bag;
        String[] stars;
        int starNumber;
        String starstar;
        String message;


        if (args.length == 0) {
            bag = new BagOfCoins();
            biasInput = DEFAULT_BIAS;
            coinCountInput = DEFAULT_COIN_COUNT;
            throwCountInput = DEFAULT_THROW_COUNT;
            partitionCountInput = DEFAULT_PARTITION_COUNT;

            for(int i = 0; i < throwCountInput; i++) {
                bag.throwCoins();
            }

            bag.getFlipHistogram(partitionCountInput);

            int[] baggie = bag.getFlipHistogram(partitionCountInput);

            int[] partitionMarkers1 = new int[partitionCountInput + 1];
            int[] partitionMarkers2 = new int[partitionCountInput];
            int[] overallPartitionMarkers = new int[2 * partitionCountInput + 2];

            for(int i = 0; i < partitionCountInput; i++) {

                partitionMarkers1[i] = i * throwCountInput / partitionCountInput;

                if(i < partitionCountInput - 1) {
                    partitionMarkers2[i] = (i + 1) * throwCountInput / partitionCountInput - 1;
                }
                else {
                    partitionMarkers2[i] = throwCountInput;
                }

                if(baggie[i] == 1) {
                    message = "coin";
                }
                else {
                    message = "coins";
                }

                if (baggie[i] != 0) {
                    starNumber = baggie[i] / 20 + 1;
                    starstar = repeat("*", starNumber);
                    System.out.println(partitionMarkers1[i] + "-" + partitionMarkers2[i] + starstar + baggie[i] + " " + message);
                }

            }
        }

        else if (args.length == 4) {
            if (args[0].equals("-")) {
                coinCountInput = DEFAULT_COIN_COUNT;
            }
            else {
                try {
                    coinCountInput = Integer.parseInt(args[0]);
                    if(coinCountInput <= 0) {
                        throw new IllegalArgumentException("Only positive numbers please.");
                    }
                  }catch (NumberFormatException e) {
                      System.err.println("Only numbers please.");
                      return;
                  }
            }

            if (args[1].equals("-")) {
                throwCountInput = DEFAULT_THROW_COUNT;
            }
            else {
                try{
                    throwCountInput = Integer.parseInt(args[1]);
                    if(throwCountInput <= 0) {
                        throw new IllegalArgumentException("Only positive numbers please.");
                    }
                  }catch (NumberFormatException e) {
                      System.err.println("Only numbers please.");
                      return;
                  }
          }

            if (args[2].equals("-")) {
                partitionCountInput = DEFAULT_PARTITION_COUNT;
            }
            else {
                try{
                    partitionCountInput = Integer.parseInt(args[2]);
                    if(partitionCountInput <= 0) {
                        throw new IllegalArgumentException("Only positive numbers please.");
                    }
                  }catch (NumberFormatException e) {
                      System.err.println("Only numbers please.");
                      return;
                  }
            }

            if (args[3].equals("-")) {
                biasInput = DEFAULT_BIAS;
            }
            else {
                try{
                    biasInput = Double.parseDouble(args[3]);
                    if(biasInput <= 0) {
                        throw new IllegalArgumentException("Only positive numbers please.");
                    }
                }catch (NumberFormatException e) {
                    System.err.println("Only numbers please.");
                    return;
                }

            }

            if (args[0].equals("-") && !args[3].equals("-")) {
                bag = new BagOfCoins(biasInput);
            }
            else if(!args[0].equals("-") && args[3].equals("-")) {
                bag = new BagOfCoins(coinCountInput);
            }
            else if(!args[0].equals("-") && !args[3].equals("-")) {
                bag = new BagOfCoins(coinCountInput, biasInput);
            }
            else {
                bag = new BagOfCoins();
            }


            for(int i = 0; i < throwCountInput; i++) {
                bag.throwCoins();
            }

            bag.getFlipHistogram(partitionCountInput);

            int[] baggie = bag.getFlipHistogram(partitionCountInput);

            int[] partitionMarkers1 = new int[partitionCountInput + 1];
            int[] partitionMarkers2 = new int[partitionCountInput];
            int[] overallPartitionMarkers = new int[2 * partitionCountInput + 2];

            for(int i = 0; i < partitionCountInput; i++) {

                partitionMarkers1[i] = i * throwCountInput / partitionCountInput;

                if(i < partitionCountInput - 1) {
                    partitionMarkers2[i] = (i + 1) * throwCountInput / partitionCountInput - 1;
                }
                else {
                    partitionMarkers2[i] = throwCountInput;
                }

                if(baggie[i] == 1) {
                    message = "coin";
                }
                else {
                    message = "coins";
                }

                if (baggie[i] != 0) {
                  starNumber = baggie[i] / 20 + 1;
                  starstar = repeat("*", starNumber);
                  System.out.println(partitionMarkers1[i] + "-" + partitionMarkers2[i] + starstar + baggie[i] + " " + message);
                }
            }
        }

            else{
              System.out.println("You can either put in no arguments or four numberical arguments, the last of which may be a decimal.");
            }
      }
}
