package linked_yarn;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import java.util.NoSuchElementException;

public class LinkedYarn implements LinkedYarnInterface {

    // -----------------------------------------------------------
    // Fields
    // -----------------------------------------------------------
    private Node head;
    private int size, uniqueSize, modCount;
    
    // -----------------------------------------------------------
    // Constructors
    // -----------------------------------------------------------
    LinkedYarn () {
        head = null;
        size = 0;
        uniqueSize = 0;
        modCount = 0;
    }
    
    LinkedYarn (LinkedYarn other) {
        if (other.isEmpty()) {
        	head = null;
            size = 0;
            uniqueSize = 0;
            modCount = 0;
        } else {
        	head = null;
            size = 0;
            uniqueSize = 0;

            for (Node n = other.head; n != null; n = n.next ) {
            	for (int i = 0; i < n.count; i++) {
            		this.insert(n.text);
            		head = findNode(n.text);
            	}
            }
            modCount = other.modCount;
        }
    }
    // -----------------------------------------------------------
    // Methods
    // -----------------------------------------------------------
    public boolean isEmpty () {
        return head == null;
    }
    
    public int getSize () {
        return this.size;
    }
    
    public int getUniqueSize () {
        return this.uniqueSize;
    }
    
    public void insert (String toAdd) {
		Node addedNode = new Node(toAdd, 1);
    	if (this.isEmpty()) {
    		head = addedNode;
    		uniqueSize++;
    	} else if (!this.isEmpty() && !this.contains(toAdd)) {
    		Node currentHead = head;
    		currentHead.prev = addedNode;
    		head = addedNode;
    		addedNode.next = currentHead;
    		uniqueSize++;
    	} else {
    		Node insertNode = findNode(toAdd);
    		insertNode.count++;
    	}
		size++;
		modCount ++;
    }
    
    public int remove (String toRemove) {
    	int answer = 0;
    	if (this.contains(toRemove)) {
    		Node removeNode = findNode(toRemove);
    		if (removeNode.count == 1) {
    			if (size == 1) {
    				head = null;
    				answer = 0;
    			} else if (head == removeNode){
        			Node nodeAfter = removeNode.next;
        			head = nodeAfter;
        			nodeAfter.prev = null;
    			} else {
    				Node nodeBefore = removeNode.prev;
            		Node nodeAfter = removeNode.next;
            		nodeBefore.next = nodeAfter;
    			}
        		removeNode.next = null;
        		removeNode.prev = null;
        		size--;
        		uniqueSize--;
        		answer = 0;
        		modCount++;
    		} else if (removeNode.count > 1) {
    			removeNode.count--;
    			answer = removeNode.count;
    			size--;
    			modCount++;
    		} else {
    			answer = 0;
    		}
    	} else {
    		answer = 0;
    	}
    	return answer;
    }
    
    public void removeAll (String toNuke) {
    	if (contains(toNuke)) {
            Node nodeToNuke = findNode(toNuke);
            size -= (nodeToNuke.count - 1);
            nodeToNuke.count = 1;
            remove(nodeToNuke.text);
            modCount++;
    	}
    }
    
    public int count (String toCount) {
    	Node nodeToCount = findNode(toCount);
    	int answer = 0;
    	if (nodeToCount == null) {
    		answer = 0;
    	} else {
    		answer = nodeToCount.count;

    	}
    	return answer;
    }
    
    public boolean contains (String toCheck) {
    	if (this.isEmpty()) {
    		return false;
    	} else {
        	Node current = head;
        	int flag = 0;
        	for (int i = 0; i < this.getUniqueSize(); i++) {
        		if (toCheck.equals(current.text)) {
        			flag++;
        			break;
        		}
        	current = current.next;	
        	}
        	return flag > 0;
    	}

    }
    
    public String getMostCommon () {
        if (isEmpty()) {
        	return null;
        } else {
        	Node current = head;
        	int highestCount = current.count;
        	String mostCommonString = current.text;
        	for (int i = 0; i < this.getUniqueSize() - 1; i++) {
        		if (highestCount <= current.next.count) {
        			highestCount = current.next.count;
        			mostCommonString = current.next.text;
        		}
        		current = current.next;
        	}
        	return mostCommonString;
        }
    }
    
    public void swap (LinkedYarn other) {
        Node betweenHead = head;
        int betweenSize = size, betweenUniqueSize = uniqueSize,
        		betweenModCount = modCount;
        
        head = other.head;
        size = other.size;
        uniqueSize = other.uniqueSize;
        modCount = other.modCount;
        
        other.head = betweenHead;
        other.size = betweenSize;
        other.uniqueSize = betweenUniqueSize;
        other.modCount = betweenModCount;

        this.modCount++;
        other.modCount++;
    }
    
    public LinkedYarn.Iterator getIterator () {
    	LinkedYarn.Iterator itty = new LinkedYarn.Iterator(this);
    	return itty;
    }
    
    
    // -----------------------------------------------------------
    // Static methods
    // -----------------------------------------------------------
    
    public static LinkedYarn knit (LinkedYarn y1, LinkedYarn y2) {
    	LinkedYarn knittedYarn = new LinkedYarn(y1);
        for (Node n = y2.head; n != null; n = n.next) {
        	for (int i = 0; i < n.count; i++) {
        		knittedYarn.insert(n.text);
        	}
        }
        return knittedYarn;
    }
    
    public static LinkedYarn tear (LinkedYarn y1, LinkedYarn y2) {
    	LinkedYarn tornYarn = new LinkedYarn(y1);
        for (Node n = y2.head; n != null; n = n.next) {
        	if (tornYarn.contains(n.text)) {
            	for (int i = 0; i < n.count; i++) {
            		tornYarn.remove(n.text);
            	}
        	}
        }
        return tornYarn;
    }
    
    public static boolean sameYarn (LinkedYarn y1, LinkedYarn y2) {
    	return (LinkedYarn.tear(y1,  y2).isEmpty() && LinkedYarn.tear(y2,  y1).isEmpty());
    }
    
    // -----------------------------------------------------------
    // Private helper methods
    // -----------------------------------------------------------
    
    /*
     * This method returns the node with the string toFind in the LinkedYarn
     */
    private Node findNode (String toFind) {
    	if (this.contains(toFind)) {
        	Node current = head;
        	Node answer = null;
        	for (int i = 0; i < this.getUniqueSize(); i++) {
        		if (current.text.equals(toFind)) {
        			answer = current;
        			break;
        		}
        		current = current.next;
        	}
        	return answer;
    	} else {
    		return null;
    	}
    }
    
    // -----------------------------------------------------------
    // Inner Classes
    // -----------------------------------------------------------
    
    public class Iterator implements LinkedYarnIteratorInterface {
        LinkedYarn owner;
        Node current;
        int itModCount;
        // this field keeps track of how many instances of the Node's string 
        // have been iterated through already (in terms of next() and prev())
        int currentNodeSpot;
        
        Iterator (LinkedYarn y) {
            owner = y;
            current = y.head;
            itModCount = y.modCount;
            // the count starts at the first instance of the head's text
            currentNodeSpot = 1;
        }
        
        public boolean hasNext () {
        	boolean answer = false;
        	if (isValid()) {
            	if (current.count > currentNodeSpot) {
            		answer = true;
            	} else if (current.count == currentNodeSpot && current.next != null){
            		answer = true;
            	} else {
            		answer = false;
            	}
        	} else {
        		answer = false;
        	}
        	return answer;
        }
        
        public boolean hasPrev () {
        	boolean answer = false;
        	if (isValid()) {
            	if (current.count > currentNodeSpot) {
            		answer = true;
            	} else if (current.count == currentNodeSpot && current.prev != null){
            		answer = true;
            	} else {
            		answer = false;
            	}
        	} else {
        		answer = false;
        	}
        	return answer;
        }
        
        public boolean isValid () {
            return itModCount == owner.modCount;
        }
        
        public String getString () {
            if (isValid()) {
            	return current.text;
            } else {
            	return null;
            }
        }

        public void next () {
            if (isValid()) {
            	if (current.count > currentNodeSpot) {
            		currentNodeSpot++;
            	} else if (current.count == currentNodeSpot && current.next != null){
            		current = current.next;
            		currentNodeSpot = 1;
            	} else {
            		throw new NoSuchElementException();
            	}
            } else {
            	throw new IllegalStateException();
            }
        }
        
        public void prev () {
            if (isValid()) {
            	if (currentNodeSpot > 1) {
            		currentNodeSpot--;
            	} else if (currentNodeSpot == 1 && current.prev != null){
            		this.current = this.current.prev;
            		currentNodeSpot = current.count;
            	} else {
            		throw new NoSuchElementException();
            	}
            } else {
            	throw new IllegalStateException();
            }      
        }
        
        public void replaceAll (String toReplaceWith) {
            if (isValid()) {
            	current.text = toReplaceWith;
            	itModCount++;
            	owner.modCount++;
            } else {
            	throw new IllegalStateException();
            }
        } 
    }
    
    class Node {
        Node next, prev;
        String text;
        int count;
        
        Node (String t, int c) {
            text = t;
            count = c;
            next = null;
            prev = null;
        }
    }
}
