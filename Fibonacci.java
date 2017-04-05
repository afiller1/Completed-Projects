public class Fibonacci {

    public static void main(String[] args) {

        if (args.length != 1) {
            System.out.println("Please input one Intzillas. This program will");
            System.out.println("give you the Fibonacci sequence value of your input.");
            return;
        }

        Intzilla inputIntzilla = null;

        try {
            inputIntzilla = new Intzilla(args[0]);
        } catch (IllegalArgumentException iaexc) {
            System.out.println("Please input one Intzillas. This program will");
            System.out.println("give you the Fibonacci sequence value of your input.");
            return;
        }

        System.out.println("The value of the "
            + inputIntzilla.toString() + " number in the Fibonacci sequence is "
            + fibonacci(inputIntzilla).toString() + ".");
    }

    private static Intzilla fibonacci(Intzilla input) {
        final Intzilla zero = new Intzilla();
        final Intzilla one = new Intzilla("1");
        Intzilla firstValue = new Intzilla();
        Intzilla secondValue = new Intzilla("1");
        Intzilla solution = new Intzilla();

        if (input.equals(zero)) {
            return zero;
        }
        else if (input.equals(one)) {
            return one;
        }
        else if (input.isLessThan(zero)) {
            System.out.println("This program doesn't work for negative numbers!");
            return null;
        }
        else {
            for (Intzilla i = one; i.isLessThan(input); i = i.plus(one)) {
                solution = firstValue.plus(secondValue);
                firstValue = secondValue;
                secondValue = solution;
            }
            return solution;
        }
    }
}
