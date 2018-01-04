package autocompleter;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import java.util.ArrayList;

public class Autocompleter implements AutocompleterInterface {

    // -----------------------------------------------------------
    // Fields
    // -----------------------------------------------------------
    TTNode root;
    
    
    // -----------------------------------------------------------
    // Constructor
    // -----------------------------------------------------------
    Autocompleter () {
        root = null;
    }
    
    
    // -----------------------------------------------------------
    // Methods
    // -----------------------------------------------------------
    
    public boolean isEmpty () {
    	return root == null;
    }
    
    public void addTerm (String toAdd) {
    	root = addTerm(root, toAdd, 0);    
    }
    
    public boolean hasTerm (String query) {
    	return hasTerm(root, query);
    }
    
    public String getSuggestedTerm (String query) {
        return getSuggestedTerm(root, query);
    }
    
    public ArrayList<String> getSortedTerms () {
        ArrayList<String> answer = new ArrayList<String>();
        return getSortedTerms(root, answer, "");
    }
    
    
    // -----------------------------------------------------------
    // Helper Methods
    // -----------------------------------------------------------
    
    private String normalizeTerm (String s) {
        // Edge case handling: empty Strings illegal
        if (s == null || s.equals("")) {
            throw new IllegalArgumentException();
        }
        return s.trim().toLowerCase();
    }
    
    /*
     * Returns:
     *   int less than 0 if c1 is alphabetically less than c2
     *   0 if c1 is equal to c2
     *   int greater than 0 if c1 is alphabetically greater than c2
     */
    private int compareChars (char c1, char c2) {
        return Character.toLowerCase(c1) - Character.toLowerCase(c2);
    }
    
    // [!] Add your own helper methods here!
   
    private boolean hasTerm(TTNode current, String query) {
    	query = normalizeTerm(query);
    	for (int i = 0; i < query.length(); i++) {
        	if (current == null) { return false; }
        	// If the last letter of our query does not correspond to a word end
        	// in our tree, returns false.
        	if (!current.wordEnd && (i == query.length() - 1) && 
        		current.letter == query.charAt(query.length() - 1)) { 
        		return false;
        	}
        	if (compareChars(query.charAt(i), current.letter ) == 0) {
        		current = current.mid;
        	} else if (compareChars(query.charAt(i), current.letter ) < 0) {
        		current = current.left;
        		i--;
        	} else {
        		current = current.right;
        		i--;
        	}
    	}
    	return true;
    }

    private TTNode addTerm(TTNode current, String query, int counter) {
    	query = normalizeTerm(query);
    	if (counter < query.length()) {
        	if (current == null) {
        		if (counter < query.length() - 1) {
        			current = new TTNode(query.charAt(counter), false);
        			counter++;
        			current.mid = addTerm(current.mid, query, counter);
        		} else {
        			current = new TTNode(query.charAt(counter), true);
        			counter++;
        		}
        	} 
        	else {
            	if (compareChars(query.charAt(counter), current.letter) < 0) {
            		current.left = addTerm(current.left, query, counter);
            	} else if (compareChars(query.charAt(counter), current.letter) > 0){
            		current.right = addTerm(current.right, query, counter);
            	} else {
            		if (!current.wordEnd && counter >= query.length() - 1 ) {
            			current.wordEnd = true;
            			counter++;
            		}
            		counter++;
            		current.mid = addTerm(current.mid, query, counter);
            	}
        	}
    	}
        	return current;
    }
    
    /* 
     * Returns whether or not the tree contains the given query; 
     * returns true if the query exists in the tree, whether or not
     * the last letter is a word end.
    */ 
    private boolean hasFragment(TTNode current, String query) {
    	query = normalizeTerm(query);
    	for (int i = 0; i < query.length(); i++) {
        	if (current == null) { return false; }
        	if (compareChars(query.charAt(i), current.letter ) == 0) {
        		current = current.mid;
        	} else if (compareChars(query.charAt(i), current.letter ) < 0) {
        		current = current.left;
        		i--;
        	} else {
        		current = current.right;
        		i--;
        	}
    	}
    	return true;
    }
    
    /*
     * Returns the node that corresponds to the last letter of the given query.
     */
    private TTNode getLastLetterNode(TTNode current, String query) {
    	query = normalizeTerm(query);
    	
    	for (int i = 0; i < query.length(); i++) {
    		if (i >= query.length() - 1 && current.letter == query.charAt(query.length() - 1)) {
    			return current;
    		}
    		if (compareChars(query.charAt(i), current.letter ) == 0) {
        		current = current.mid;
        	} else if (compareChars(query.charAt(i), current.letter ) < 0) {
        		current = current.left;
        		i--;
        	} else {
        		current = current.right;
        		i--;
        	}
    	}
    	return current;
    }
    
    private String getSuggestedTerm(TTNode current, String query) {
    	query = normalizeTerm(query);
    	if (hasTerm(query)) {
    		return query;
    	} 
    	if (!hasFragment(current, query)) {
    		return null;
    	}
        TTNode lastNode = getLastLetterNode(current, query);
        TTNode nextNode = lastNode.mid;
    	if (!hasFragment(current, query)) {
    		return null;
    	} else {
    		query = query + String.valueOf(nextNode.letter);
        	return getSuggestedTerm(current, query);
    	}
    }
    
    private ArrayList<String> getSortedTerms (TTNode current, ArrayList<String> list, String word) {
    	if (current != null) {
    		getSortedTerms(current.left, list, word);
        	word += current.letter;
        	if (current.wordEnd) {
        		list.add(word);
        	}
    		getSortedTerms(current.mid, list, word);
    		word = word.substring(0, word.length() - 1);
    		getSortedTerms(current.right, list, word);
    	}
    	return list;
    }
    
    // -----------------------------------------------------------
    // TTNode Internal Storage
    // -----------------------------------------------------------
    
    /*
     * Internal storage of autocompleter search terms
     * as represented using a Ternary Tree with TTNodes
     */
    private class TTNode {
        
        boolean wordEnd;
        char letter;
        TTNode left, mid, right;
        
        TTNode (char c, boolean w) {
            letter  = c;
            wordEnd = w;
            left    = null;
            mid     = null;
            right   = null;
        }
    }
}
