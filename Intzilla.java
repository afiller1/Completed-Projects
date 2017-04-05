public class Intzilla {

    private String s;
    private boolean positivity;
    private String intzillaString;
    private String intzillaStringWithSign;

    private String inputString;
    private String[] stringArgList;
    private int[] intArgList;
    private String sign;
    private boolean truth;
    private boolean flag = true;
    private String firstIntzillaString;
    private int[] firstIntzillaArray;
    private String secondIntzillaString;
    private int[] secondIntzillaArray;
    private Intzilla answerIntzilla;
    private String[] firstStringArray;
    private String[] secondStringArray;
    private int[] firstIntzillaArray2;
    private int[] secondIntzillaArray2;

    public Intzilla() {
        this.s = "0";
        intArgList = new int[1];
        intArgList[0] = 0;
        intzillaString = "0";
        positivity = true;
        intzillaStringWithSign = "0";
    }

    public Intzilla(String s) {
        this.s = s;
        String p = s.trim();
        stringArgList = p.split("");

        if (stringArgList[0].equals("+")) {
            positivity = true;
        }
        else if (stringArgList[0].equals("-")) {
            positivity = false;
        }
        else {
            positivity = true;
        }

        try{
            if (stringArgList[0].equals("+") || stringArgList[0].equals("-")) {
                intArgList = new int[stringArgList.length - 1];
                for (int i = 0; i < stringArgList.length - 1; i++) {
                    intArgList[i] = Integer.parseInt(stringArgList[i + 1]);
                }
            }
            else {
                intArgList = new int[stringArgList.length];
                for (int i = 0; i < stringArgList.length; i++) {
                    intArgList[i] = Integer.parseInt(stringArgList[i]);
                }
            }
        } catch (Exception e) {
            throw new IllegalArgumentException("Please input an Intzilla.");
        }


        intzillaString = stringProcessor();

        if (!"0".equals(intzillaString) && positivity) {
            sign = "+";
        }
        else if (!positivity) {
            sign = "-";
        }
        else {
            sign = "";
        }
        intzillaStringWithSign = sign + intzillaString;
    }

    public String stringProcessor() {
        s = s.trim();
        if (this.s.substring(0, 1).equals("0") && this.s.length() == 1) {
            intzillaString = "0";
        }
        else if (this.s.substring(0, 1).equals("+") ||
            this.s.substring(0, 1).equals("-")
            || this.s.substring(0, 1).equals("0")) {
            for (int i = 1; i < this.s.length() - 1; i++) {
                truth = true;
                if (this.s.substring(i, i + 1).equals("0")) {
                    truth = true;
                }
                else {
                    truth = false;
                    i = this.s.length() + 100;
                }
            }

            if (truth) {
                intzillaString = "0";
            }
            else {
                intzillaString = this.s.substring(1, this.s.length());
                intzillaString = intzillaString.replaceFirst("^0*", "");
            }
        }
        else {
            intzillaString = this.s.substring(0, this.s.length());
            intzillaString = intzillaString.replaceFirst("^0*", "");
        }
        return intzillaString;
    }

    public String toString() {
        return intzillaStringWithSign;
    }




    public boolean isLessThan(Intzilla n) {
        firstIntzillaString = this.intzillaStringWithSign;
        boolean answer = true;

        secondIntzillaString = n.toString();
        if (n.equals(new Intzilla(this.intzillaStringWithSign))) {
            answer = false;
        }
        else if ("+".equals(firstIntzillaString.substring(0, 1)) && "-".equals(secondIntzillaString.substring(0, 1))) {
            answer = false;
        }
        else if ("-".equals(firstIntzillaString.substring(0, 1)) && "+".equals(secondIntzillaString.substring(0, 1))) {
            answer = true;
        }
        else if ("+".equals(firstIntzillaString.substring(0, 1)) && "0".equals(secondIntzillaString)) {
            answer = false;
        }
        else if ("0".equals(firstIntzillaString) && "-".equals(secondIntzillaString.substring(0, 1))) {
            answer = false;
        }
        else if ("-".equals(firstIntzillaString.substring(0, 1)) && "0".equals(secondIntzillaString)) {
            answer = true;
        }
        else if ("0".equals(firstIntzillaString) && "+".equals(secondIntzillaString.substring(0, 1))) {
            answer = true;
        }
        else if ("+".equals(firstIntzillaString.substring(0, 1)) && "+".equals(secondIntzillaString.substring(0, 1))) {
            if (firstIntzillaString.length() > secondIntzillaString.length()) {
                answer = false;
            }
            else if (firstIntzillaString.length() < secondIntzillaString.length()) {
                answer = true;
            }
            else if (firstIntzillaString.length() == secondIntzillaString.length()) {
                for (int i = 1; i < secondIntzillaString.length(); i++) {
                    if (Integer.parseInt(firstIntzillaString.substring(i, i + 1))
                        < Integer.parseInt(secondIntzillaString.substring(i, i + 1))) {
                        flag = false;
                        answer = true;
                        i = secondIntzillaString.length();
                    }
                    else {
                        answer = false;
                        flag = false;
                    }
                }
            }
        }
        else if ("-".equals(firstIntzillaString.substring(0, 1)) && "-".equals(secondIntzillaString.substring(0, 1))) {
            if (firstIntzillaString.length() < secondIntzillaString.length()) {
                answer = false;
            }
            else if (firstIntzillaString.length() > secondIntzillaString.length()) {
                answer = true;
            }
            else if (firstIntzillaString.length() == secondIntzillaString.length()) {
                for (int i = 1; i < secondIntzillaString.length(); i++) {
                    if (Integer.parseInt(firstIntzillaString.substring(i, i + 1))
                        > Integer.parseInt(secondIntzillaString.substring(i, i + 1))) {
                        flag = false;
                        answer = true;
                        i = secondIntzillaString.length();
                    }
                    else {
                        answer = false;
                        flag = false;
                    }
                }
            }
        }

        return answer;
    }

    public boolean equals(Object n) {
        boolean answer = true;
        if (n instanceof Intzilla) {
            String nIntzilla = n.toString();

            if (nIntzilla.length() != intzillaStringWithSign.length()) {
                answer = false;
            }
            else if (!nIntzilla.substring(0, 1).equals(intzillaStringWithSign.substring(0, 1))) {
                answer = false;
            }
            else if (nIntzilla.length() == intzillaStringWithSign.length() &&
                nIntzilla.substring(0, 1).equals(intzillaStringWithSign.substring(0, 1))) {
                String a = "0";
                String b = "0";
                for (int i = 0; i < nIntzilla.length(); i++) {
                    a = nIntzilla.substring(i, i + 1);
                    b = intzillaStringWithSign.substring(i, i + 1);
                    if (!a.equals(b)) {
                        answer = false;
                        i = nIntzilla.length();
                    }
                    else {
                        answer = true;
                    }
                }
            }
            else {
                answer = true;
            }
        }
        else {
            answer = false;
            throw new IllegalArgumentException("Only Intzillas, please!");
        }
        return answer;
    }

    public boolean isGreaterThan(Intzilla n) {
        boolean answer = true;

        if (isLessThan(n) || this.intzillaStringWithSign.equals(n)) {
            answer = false;
        }
        else {
            answer = true;
        }
        return answer;

    }

    public Intzilla plus(Intzilla addend) {
        firstIntzillaString = this.intzillaStringWithSign;
        secondIntzillaString = addend.toString();
        firstStringArray = firstIntzillaString.split("");
        secondStringArray = secondIntzillaString.split("");
        firstIntzillaArray = new int[firstStringArray.length - 1];
        secondIntzillaArray = new int[secondStringArray.length - 1];
        String sign = "+";
        int q;
        int k;

        if ("0".equals(firstIntzillaString)) {
            answerIntzilla = new Intzilla(secondIntzillaString);
        }
        else if ("0".equals(secondIntzillaString)) {
            answerIntzilla = new Intzilla(firstIntzillaString);
        }
        else if ("+".equals(firstIntzillaString.substring(0, 1)) && "+".equals(secondIntzillaString.substring(0, 1))
            || "-".equals(firstIntzillaString.substring(0, 1)) && "-".equals(secondIntzillaString.substring(0, 1))) {
            for (int i = 1; i < firstStringArray.length; i++) {
                firstIntzillaArray[i - 1] = Integer.parseInt(firstStringArray[i]);
            }
            for (int i = 1; i < secondStringArray.length; i++) {
                secondIntzillaArray[i - 1] = Integer.parseInt(secondStringArray[i]);

            }

            if ("+".equals(firstIntzillaString.substring(0, 1))) {
                sign = "+";
            }
            else if ("-".equals(firstIntzillaString.substring(0, 1))) {
                sign = "-";
            }

            if (firstIntzillaArray.length > secondIntzillaArray.length) {
                q = firstIntzillaArray.length + 1;
                // System.out.println(q);
                k = secondIntzillaArray.length;
                firstIntzillaArray2 = new int[q];
                secondIntzillaArray2 = new int[q];
                for (int i = 0; i < q; i++) {
                    if (i < q - k) {
                        secondIntzillaArray2[i] = 0;
                    }
                    else {
                        secondIntzillaArray2[i] = secondIntzillaArray[i - (q - k)];
                    }
                    if (i == 0) {
                        firstIntzillaArray2[i] = 0;
                    }
                    else {
                        firstIntzillaArray2[i] = firstIntzillaArray[i - 1];
                    }
                }
            }

            else if (firstIntzillaArray.length == secondIntzillaArray.length) {
                q = firstIntzillaArray.length + 1;
                firstIntzillaArray2 = new int[q];
                secondIntzillaArray2 = new int[q];
                firstIntzillaArray2[0] = 0;
                secondIntzillaArray2[0] = 0;
                for (int i = 1; i < q; i++) {
                    firstIntzillaArray2[i] = firstIntzillaArray[i - 1];
                    secondIntzillaArray2[i] = secondIntzillaArray[i - 1];
                }
            }

            else {
                q = secondIntzillaArray.length + 1;
                k = firstIntzillaArray.length;
                firstIntzillaArray2 = new int[q];
                secondIntzillaArray2 = new int[q];
                for (int i = 0; i < q; i++) {
                    if (i < q - k) {
                        firstIntzillaArray2[i] = 0;
                    }
                    else {
                        firstIntzillaArray2[i] = firstIntzillaArray[i - (q - k)];
                    }
                    if (i == 0) {
                        secondIntzillaArray2[i] = 0;
                    }
                    else {
                        secondIntzillaArray2[i] = secondIntzillaArray[i - 1];
                    }
                }
            }

            int[] answerArray = new int[q];
            String[] answerStrArray = new String[q];
            int carry;
            int addedNumber;
            carry = 0;
            addedNumber = 0;

            for (int i = q - 1; i >= 0; i--) {
                if (i == 0) {
                    addedNumber = firstIntzillaArray2[i];
                }
                else if (firstIntzillaArray2[i] + secondIntzillaArray2[i] <= 9) {
                    addedNumber = firstIntzillaArray2[i] + secondIntzillaArray2[i];
                }
                else if (firstIntzillaArray2[i] + secondIntzillaArray2[i] == 10) {
                    addedNumber = 0;
                    firstIntzillaArray2[i - 1] = firstIntzillaArray2[i - 1] + 1;
                }
                else if (firstIntzillaArray2[i] + secondIntzillaArray2[i] > 10) {
                    addedNumber = (firstIntzillaArray2[i] + secondIntzillaArray2[i])
                        % 10;
                    firstIntzillaArray2[i - 1] = firstIntzillaArray2[i - 1] +
                        ((firstIntzillaArray2[i] + secondIntzillaArray2[i]) - addedNumber) / 10;
                }
                answerArray[i] = addedNumber;
            }
            for (int i = 0; i < answerArray.length; i++) {
                answerStrArray[i] = String.valueOf(answerArray[i]);
            }
            String answerString;
            answerString = String.join("", answerStrArray);
            answerString = answerString.replaceFirst("^0*", "");
            answerIntzilla = new Intzilla(sign + answerString);

        }
        else if (firstIntzillaString.substring(0, 1).equals("+") &&
            secondIntzillaString.substring(0, 1).equals("-")) {
            answerIntzilla = new Intzilla(this.intzillaStringWithSign).minus(new Intzilla(secondIntzillaString.substring(1, secondIntzillaString.length())));
        }
        else if (firstIntzillaString.substring(0, 1).equals("-") &&
            secondIntzillaString.substring(0, 1).equals("+")) {
            answerIntzilla = new Intzilla(secondIntzillaString).minus(new Intzilla(this.intzillaStringWithSign.substring(1, intzillaStringWithSign.length())));
        }
        return answerIntzilla;
    }

    public Intzilla minus(Intzilla subtrahend) {
        String sign = "+";
        String firstString = this.intzillaStringWithSign;
        String secondString = subtrahend.toString();
        Intzilla firstIntzilla = new Intzilla(firstString);
        Intzilla secondIntzilla = new Intzilla(secondString);
        Intzilla answerIntzilla = new Intzilla();

        if (firstIntzilla.equals(secondIntzilla)) {
            answerIntzilla = new Intzilla();
        }
        else if (firstIntzilla.equals(new Intzilla("0")) &&
            !secondIntzilla.equals(new Intzilla("0"))) {
            if (secondString.substring(0, 1).equals("+")) {
                sign = "-";
            }
            else if (secondString.substring(0, 1).equals("+")) {
                sign = "+";
            }
            answerIntzilla = new Intzilla(sign + secondIntzilla.toString().substring(1, secondString.length()));
        }
        else if (secondIntzilla.equals(new Intzilla("0")) && !firstIntzilla.equals(new Intzilla("0"))) {
            answerIntzilla = firstIntzilla;
        }

        if (firstString.substring(0, 1).equals("+") && secondString.substring(0, 1).equals("-")) {
            String modifiedSecondString = secondString.substring(1, secondString.length());
            firstIntzilla = new Intzilla(firstString);
            secondIntzilla = new Intzilla(modifiedSecondString);
            answerIntzilla = firstIntzilla.plus(secondIntzilla);
            sign = "+";
        }
        else if ("-".equals(firstString.substring(0, 1)) && "+".equals(secondString.substring(0, 1))) {
            if (firstString.substring(1, firstString.length()).equals(secondString.substring(1, secondString.length()))) {
                answerIntzilla = (new Intzilla("0"));
            }
        }
        else if ("+".equals(firstString.substring(0, 1)) && "+".equals(secondString.substring(0, 1))) {
            firstIntzilla = new Intzilla(firstString);
            secondIntzilla = new Intzilla(secondString);
            String[] firstStringArray = firstString.split("");
            int[] firstIntArray = new int[firstStringArray.length - 1];
            String[] secondStringArray = secondString.split("");
            int[] secondIntArray = new int[secondStringArray.length - 1];
            int q = 0;
            for (int i = 1; i < firstString.length(); i++) {
                firstIntArray[i - 1] = Integer.parseInt(firstStringArray[i]);
            }
            for (int i = 1; i < secondString.length(); i++) {
                secondIntArray[i - 1] = Integer.parseInt(secondStringArray[i]);
            }

            int[] answerIntArray;
            int[] firstIntzillaArray2;
            int[] secondIntzillaArray2;
            int k;
            int subtractedNumber;
            String[] answerStrArray;
            String answerString;

            if (firstIntzilla.equals(secondIntzilla)) {
                answerIntzilla = new Intzilla("0");
            }
            else if (firstIntzilla.isLessThan(secondIntzilla)) {
                sign = "-";
                q = secondIntArray.length;
                for (int i = 0; i < q; i++) {
                }
                k = firstIntArray.length;
                firstIntzillaArray2 = new int[q];
                // represents the smaller number ^
                secondIntzillaArray2 = new int[q];
                // represents the bigger number ^^
                answerIntArray = new int[q];
                answerStrArray = new String[answerIntArray.length];
                if (q != k) {
                    for (int i = 0; i < q; i++) {
                        if (i < q - k) {
                            firstIntzillaArray2[i] = 0;
                            secondIntzillaArray2[i] = secondIntArray[i];
                        }
                        else {
                            firstIntzillaArray2[i] = firstIntArray[i - (q - k)];
                            secondIntzillaArray2[i] = secondIntArray[i];
                        }
                    }
                }
                else {
                    for (int i = 0; i < q; i++) {
                        secondIntzillaArray2[i] = secondIntArray[i];
                        firstIntzillaArray2[i] = firstIntArray[i];
                    }
                }
                for (int i = q - 1; i > -1; i--) {
                    if (secondIntzillaArray2[i] >= firstIntzillaArray2[i]) {
                        subtractedNumber = secondIntzillaArray2[i] - firstIntzillaArray2[i];
                    }
                    else {
                        secondIntzillaArray2[i - 1] = secondIntzillaArray2[i - 1] - 1;
                        secondIntzillaArray2[i] = secondIntzillaArray2[i] + 10;
                        subtractedNumber = secondIntzillaArray2[i] - firstIntzillaArray2[i];
                    }
                    answerIntArray[i] = subtractedNumber;
                }
                for (int i = 0; i < answerIntArray.length; i++) {
                    answerStrArray[i] = String.valueOf(answerIntArray[i]);
                }
                answerString = String.join("", answerStrArray);
                answerString = answerString.replaceFirst ("^0*", "");
                answerIntzilla = new Intzilla(sign + answerString);
            }

            else if (firstIntzilla.isGreaterThan(secondIntzilla)) {
                sign = "+";
                q = firstIntArray.length;
                k = secondIntArray.length;
                firstIntzillaArray2 = new int[q];
                // represents the smaller number ^
                secondIntzillaArray2 = new int[q];
                // represents the bigger number ^^
                answerIntArray = new int[q];
                answerStrArray = new String[answerIntArray.length];
                if (q != k) {
                    for (int i = 0; i < q; i++) {
                        if (i < q - k) {
                            secondIntzillaArray2[i] = 0;
                            firstIntzillaArray2[i] = firstIntArray[i];
                        }
                        else {
                            secondIntzillaArray2[i] = secondIntArray[i - (q - k)];
                            firstIntzillaArray2[i] = firstIntArray[i];
                        }
                    }
                }
                else {
                    for (int i = 0; i < q; i++) {
                        secondIntzillaArray2[i] = secondIntArray[i];
                        firstIntzillaArray2[i] = firstIntArray[i];
                    }
                }
                for (int i = q - 1; i > -1; i--) {
                    if (secondIntzillaArray2[i] <= firstIntzillaArray2[i]) {
                        subtractedNumber = firstIntzillaArray2[i] - secondIntzillaArray2[i];
                    }
                    else {
                        firstIntzillaArray2[i - 1] = firstIntzillaArray2[i - 1] - 1;
                        firstIntzillaArray2[i] = firstIntzillaArray2[i] + 10;
                        subtractedNumber = firstIntzillaArray2[i] - secondIntzillaArray2[i];
                    }
                    answerIntArray[i] = subtractedNumber;
                }
                for (int i = 0; i < answerIntArray.length; i++) {
                    answerStrArray[i] = String.valueOf(answerIntArray[i]);
                }
                answerString = String.join("", answerStrArray);
                answerString = answerString.replaceFirst("^0*", "");
                answerIntzilla = new Intzilla(sign + answerString);
            }
        }
        else if ("=".equals(firstString.substring(0, 1)) && "-".equals(secondString.substring(0, 1))) {
            firstIntzilla = new Intzilla(firstString);
            secondIntzilla = new Intzilla(secondString);
            String firstIntzillaString = firstString.substring(1, firstString.length());
            String secondIntzillaString = secondString.substring(1, secondString.length());
            String[] firstStringArray = firstIntzillaString.split("");
            String[] secondStringArray = secondIntzillaString.split("");
            int q = 0;
            int k = 0;

            if (firstIntzilla.isLessThan(secondIntzilla)) {
                sign = "-";
                int[] firstIntArray = new int[firstIntzillaString.length()];
                int[] secondIntArray = new int[secondIntzillaString.length()];
                q = firstIntArray.length;
                k = secondIntArray.length;

                for (int i = 1; i < firstIntzillaString.length(); i++) {
                    firstIntArray[i] = Integer.parseInt(firstStringArray[i]);
                }
                for (int i = 1; i < secondIntzillaString.length(); i++) {
                    secondIntArray[i] = Integer.parseInt(secondStringArray[i]);
                }

                firstIntzillaArray2 = new int[q];
                secondIntzillaArray2 = new int[q];
                int subtractedNumber = 0;
                int[] answerIntArray = new int[q];
                String[] answerStrArray = new String[answerIntArray.length];
                if (q != k) {
                    for (int i = 0; i < q; i++) {
                        if (i < q - k) {
                            secondIntzillaArray2[i] = 0;
                            firstIntzillaArray2[i] = firstIntArray[i];
                        }
                        else {
                            secondIntzillaArray2[i] = secondIntArray[i - (q - k)];
                            firstIntzillaArray2[i] = firstIntArray[i];
                        }
                    }
                }
                else {
                    for (int i = 0; i < q; i++) {
                        secondIntzillaArray2[i] = secondIntArray[i];
                        firstIntzillaArray2[i] = firstIntArray[i];
                    }
                }
                for (int i = q - 1; i > -1; i--) {
                    if (secondIntzillaArray2[i] <= firstIntzillaArray2[i]) {
                        subtractedNumber = firstIntzillaArray2[i] - secondIntzillaArray2[i];
                    }
                    else {
                        firstIntzillaArray2[i - 1] = firstIntzillaArray2[i - 1] - 1;
                        firstIntzillaArray2[i] = firstIntzillaArray2[i] + 10;
                        subtractedNumber = firstIntzillaArray2[i] - secondIntzillaArray2[i];
                    }
                    answerIntArray[i] = subtractedNumber;
                }

                for (int i = 0; i < answerIntArray.length; i++) {
                    answerStrArray[i] = String.valueOf(answerIntArray[i]);
                }
                String answerString = "0";
                answerString = String.join("", answerStrArray);
                answerString = answerString.replaceFirst ("^0*", "");
                answerIntzilla = new Intzilla(sign + answerString);
            }

            else if (firstIntzilla.isGreaterThan(secondIntzilla)) {
                sign = "+";
                int[] firstIntArray = new int[secondIntzillaString.length()];
                int[] secondIntArray = new int[firstIntzillaString.length()];
                q = secondIntArray.length;
                k = firstIntArray.length;

                for (int i = 1; i < firstIntzillaString.length(); i++) {
                    firstIntArray[i] = Integer.parseInt(firstStringArray[i]);
                }
                for (int i = 1; i < secondIntzillaString.length(); i++) {
                    secondIntArray[i] = Integer.parseInt(secondStringArray[i]);
                }

                firstIntzillaArray2 = new int[q];
                secondIntzillaArray2 = new int[q];
                int subtractedNumber = 0;
                int[] answerIntArray = new int[q];
                String[] answerStrArray = new String[answerIntArray.length];
                if (q != k) {
                    for (int i = 0; i < q; i++) {
                        if (i < q - k) {
                            secondIntzillaArray2[i] = 0;
                            firstIntzillaArray2[i] = firstIntArray[i];
                        }
                        else {
                            secondIntzillaArray2[i] = secondIntArray[i - (q - k)];
                            firstIntzillaArray2[i] = firstIntArray[i];
                        }
                    }
                }
                else {
                    for (int i = 0; i < q; i++) {
                        secondIntzillaArray2[i] = secondIntArray[i];
                        firstIntzillaArray2[i] = firstIntArray[i];
                    }
                }
                for (int i = q - 1; i > -1; i--) {
                    if (secondIntzillaArray2[i] <= firstIntzillaArray2[i]) {
                        subtractedNumber = firstIntzillaArray2[i] - secondIntzillaArray2[i];
                    }
                    else {
                        firstIntzillaArray2[i - 1] = firstIntzillaArray2[i - 1] - 1;
                        firstIntzillaArray2[i] = firstIntzillaArray2[i] + 10;
                        subtractedNumber = firstIntzillaArray2[i] - secondIntzillaArray2[i];
                    }
                    answerIntArray[i] = subtractedNumber;
                }

                for (int i = 0; i < answerIntArray.length; i++) {
                    answerStrArray[i] = String.valueOf(answerIntArray[i]);
                }
                String answerString = "0";
                answerString = String.join("", answerStrArray);
                answerString = answerString.replaceFirst ("^0*", "");
                answerIntzilla = new Intzilla(sign + answerString);
            }
        }
        return answerIntzilla;
    }




    public Intzilla times(Intzilla factor) {
        String sign = "+";
        String firstString = this.intzillaStringWithSign;
        String secondString = factor.toString();
        Intzilla firstIntzilla = new Intzilla(firstString);
        Intzilla secondIntzilla = new Intzilla(secondString);
        Intzilla answerIntzilla = new Intzilla();
        int lastOfSecond = 0;
        Intzilla toAdd = new Intzilla("0");
        Intzilla sum = new Intzilla("0");

        if (firstString.substring(0, 1).equals("+") && secondString.substring(0, 1).equals("+")
            || firstString.substring(0, 1).equals("-") && secondString.substring(0, 1).equals("-")) {
            sign = "+";
        }
        else if (firstString.substring(0, 1).equals("-") && secondString.substring(0, 1).equals("+")
            || firstString.substring(0, 1).equals("+") && secondString.substring(0, 1).equals("-")) {
            sign = "-";
        }

        if (firstIntzilla.equals(new Intzilla("0")) || secondIntzilla.equals(new Intzilla("0"))) {
            answerIntzilla = new Intzilla("0");
        }
        else if (firstIntzilla.equals(new Intzilla("+1"))) {
            answerIntzilla = secondIntzilla;
        }
        else if (secondIntzilla.equals(new Intzilla("+1"))) {
            answerIntzilla = firstIntzilla;
        }
        else {
            String usefulString1 = firstString.substring(1, firstString.length());
            String usefulString2 = secondString.substring(1, secondString.length());
            Intzilla firstSignlessIntz = new Intzilla(usefulString1);
            Intzilla secondSignlessIntz = new Intzilla(usefulString2);
            if (new Intzilla(usefulString1).isGreaterThan(new Intzilla(usefulString2))) {
                firstIntzilla = new Intzilla(usefulString1);
                secondIntzilla = new Intzilla(usefulString2);
            }
            else if (new Intzilla(usefulString1).isLessThan(new Intzilla(usefulString2))
                || new Intzilla(usefulString1).equals(new Intzilla (usefulString2))) {
                firstIntzilla = new Intzilla(usefulString2);
                secondIntzilla = new Intzilla(usefulString1);
            }

            while (flag) {
                String lastString = secondSignlessIntz.toString();
                lastOfSecond = Integer.parseInt(lastString.substring(lastString.length() - 1, lastString.length()));

                if (!secondSignlessIntz.equals(new Intzilla("1")) && (lastOfSecond % 2 == 1)) {
                    toAdd = firstSignlessIntz.plus(toAdd);

                    secondSignlessIntz = secondSignlessIntz.div(new Intzilla("2"));
                    firstSignlessIntz = firstSignlessIntz.plus(firstSignlessIntz);

                }
                else if (!secondSignlessIntz.equals(new Intzilla("1")) && (lastOfSecond % 2 == 0)) {
                    secondSignlessIntz = secondSignlessIntz.div(new Intzilla("2"));
                    firstSignlessIntz = firstSignlessIntz.plus(firstSignlessIntz);

                }
                else if (secondSignlessIntz.equals(new Intzilla("1"))) {
                    toAdd = firstSignlessIntz.plus(toAdd);
                    flag = false;
                }

            }
            String lastString = toAdd.toString();
            answerIntzilla = new Intzilla(sign + lastString.substring(1, lastString.length()));
        }

        return answerIntzilla;

    }

    public Intzilla div(Intzilla divisor) {
        String sign = "+";
        String firstString = this.intzillaStringWithSign;
        String secondString = divisor.toString();
        Intzilla firstIntzilla = new Intzilla(firstString);
        Intzilla secondIntzilla = new Intzilla(secondString);
        Intzilla answerIntzilla = new Intzilla();

        if (firstString.substring(0, 1).equals("+") && secondString.substring(0, 1).equals("+")
            || firstString.substring(0, 1).equals("-") && secondString.substring(0, 1).equals("-")) {
            sign = "+";
        }
        else if (firstString.substring(0, 1).equals("-") && secondString.substring(0, 1).equals("+")
            || firstString.substring(0, 1).equals("+") && secondString.substring(0, 1).equals("-")) {
            sign = "-";
        }

        if (firstIntzilla.equals(new Intzilla("0")) && !secondIntzilla.equals(new Intzilla("0"))) {
            answerIntzilla = new Intzilla("0");
        }
        else if (!firstIntzilla.equals(new Intzilla("0")) && secondIntzilla.equals(new Intzilla("0"))) {
            System.out.println("You cannot divide by 0.");
            answerIntzilla = null;
        }
        else if (secondIntzilla.equals(new Intzilla("1"))) {
            answerIntzilla = firstIntzilla;
        }
        else if (secondIntzilla.equals(new Intzilla("-1"))) {
            answerIntzilla = new Intzilla("-" + firstString.substring(1, firstString.length()));
        }

        else if (new Intzilla(firstString.substring(1, firstString.length())).isLessThan(new Intzilla(secondString.substring(1, secondString.length())))) {
            System.out.println("The answer will not be an intzilla.");
            answerIntzilla = null;
        }
        else if (firstIntzilla.equals(secondIntzilla)) {
            answerIntzilla = new Intzilla("1");
        }

        else {
            String usefulString1 = firstString.substring(1, firstString.length());
            String usefulString2 = secondString.substring(1, secondString.length());
            Intzilla firstSignlessIntz = new Intzilla(usefulString1);
            Intzilla secondSignlessIntz = new Intzilla(usefulString2);
            String[] firstStringArray = usefulString1.split("");
            String[] secondStringArray = usefulString2.split("");
            int[] firstIntArray = new int[firstStringArray.length];
            int[] secondIntArray = new int[secondStringArray.length];
            for (int i = 0; i < firstStringArray.length; i++) {
                firstIntArray[i] = Integer.parseInt(firstStringArray[i]);
            }
            for (int i = 0; i < secondStringArray.length; i++) {
                secondIntArray[i] = Integer.parseInt(secondStringArray[i]);
            }

            Intzilla carry = new Intzilla("1");
            String addedEnding = "";
            Intzilla total = new Intzilla("0");
            String secondAlteredString = usefulString2;
            int addedValue;
            double added = 0;
            double toAdd = 0;
            double sum = 0;
            String answer = "0";

            if (firstSignlessIntz.isGreaterThan(secondSignlessIntz)) {
                int i = 0;
                while (flag) {
                    if (firstSignlessIntz.isGreaterThan(new Intzilla(secondAlteredString))) {
                        secondAlteredString = secondAlteredString + "0";
                        toAdd = Math.pow(10, i);
                        i++;
                    }
                    else if (firstSignlessIntz.isLessThan(new Intzilla(secondAlteredString))) {
                        firstSignlessIntz = firstSignlessIntz.minus(new Intzilla(secondAlteredString.substring(0, secondAlteredString.length() - 1)));
                        toAdd = Math.pow(10, i - 1);
                        added = added + toAdd;

                        secondAlteredString = usefulString2;
                        toAdd = 0;
                        if (firstSignlessIntz.isLessThan(new Intzilla(secondAlteredString))) {
                            flag = false;
                        }
                        i = 0;
                    }

                }
                answer = String.valueOf(added);
                answerIntzilla = new Intzilla(sign + answer.substring(0, answer.length() - 2));
            }
        }
    return answerIntzilla;
    }

    public Intzilla mod(Intzilla divisor) {
        String firstString = this.intzillaStringWithSign;
        String secondString = divisor.toString();
        Intzilla firstIntzilla = new Intzilla(firstString);
        Intzilla secondIntzilla = new Intzilla(secondString);
        Intzilla answerIntzilla = new Intzilla();

        if (firstIntzilla.equals(new Intzilla("0")) && !secondIntzilla.equals(new Intzilla("0"))) {
            answerIntzilla = new Intzilla("0");
        }
        else if (secondIntzilla.isLessThan(new Intzilla("0")) || secondIntzilla.equals(new Intzilla("0"))) {
            answerIntzilla = null;
            System.out.println("This program can only mod by positive Intzillas.");
        }
        else {
            if (firstString.substring(0, 1).equals("+")) {
                sign = "+";
            }
            else {
                sign = "-";
            }
            Intzilla dividedIntz = firstIntzilla.div(secondIntzilla);
            Intzilla toSubtract = secondIntzilla.times(dividedIntz);
            answerIntzilla = firstIntzilla.minus(toSubtract);
            if (!answerIntzilla.equals(new Intzilla())) {
                String lastString = answerIntzilla.toString();
                String answerString = sign + lastString.substring(1, lastString.length());
                answerIntzilla = new Intzilla(answerString);
            }

        }
        return answerIntzilla;
    }

    public static void main(String[] args) {
        System.out.println(new Intzilla("9a0"));
    }
}
