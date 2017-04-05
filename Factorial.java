public class Factorial {

    public static void main(String[] args) {

        if (args.length != 1) {
            System.out.println("Please input one Intzilla.");
            System.out.println("This program will give you the factorial of your input.");
            return;
        }

        Intzilla inputIntzilla = null;

        try {
            inputIntzilla = new Intzilla(args[0]);
        } catch (IllegalArgumentException iaexc) {
            System.out.println("Please input one Intzilla.");
            System.out.println("This program will give you the factorial of your input.");
            return;
        }

        System.out.println(inputIntzilla.toString() + "! is equal to "
            + factorial(inputIntzilla).toString() + ".");
    }

    private static Intzilla factorial(Intzilla input) {
        final Intzilla zero = new Intzilla();
        final Intzilla one = new Intzilla("1");
        Intzilla mult = new Intzilla("1");

        if (input.equals(zero)) {
            return one;
        }
        else if (input.equals(one)) {
            return one;
        }
        else if (input.isLessThan(zero)) {
            System.out.println("You can't do factorials to negative numbers!");
            return null;
        }
        else {
            for (Intzilla i = input; i.isGreaterThan(one); i = i.minus(one)) {
                mult = mult.times(i);
            }
            return mult;
        }
    }

}
