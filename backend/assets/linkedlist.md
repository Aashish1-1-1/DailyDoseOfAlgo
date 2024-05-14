## Linkedlist
Linked lists are linear data structures consisting of a sequence of elements called nodes.
Unlike arrays, where elements are stored in contiguous memory locations, linked list
elements are dynamically allocated and connected via pointers.

## Advantages
• Linked lists allow for dynamic memory allocation, meaning that memory can be
allocated and deallocated as needed during program execution.
• Efficient Insertion and deletion of nodes in a linked list.
• Linked lists don’t suffer from the overhead of fixed size allocation like arrays.
• Linked lists can grow or shrink dynamically without need for resizing operations.
• Linked lists can be used to implement various other data structures and algorithms,like stack, queues etc.

# Output
```cpp
    
int main(){
	LinkedList *l1=new LinkedList();
	l1->addToTail(34);
	l1->addToHead(56);
	l1->addToHead(25);
	l1->addToTail(69);
	l1->remove(56);
	l1->removeFromTail();
	l1->add(l1->getHead(),62);
	l1->add(l1->getHead(),79);
	l1->traverse();
	delete l1;//freeing memory used
}

```
```bash
    25 79 62 34 
```
