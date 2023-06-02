import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class DrinksDataService {

  private orderItemCollection: AngularFirestoreCollection;
  orderItems: Observable<any>;

  private orderItemCollectionEve !: AngularFirestoreCollection;
  orderItemsEve !: Observable<any>;

  constructor(private firestore: AngularFirestore, private afAuth: AngularFireAuth, private router: Router, private toastr: ToastrService) {
    this.orderItemCollection = this.firestore.collection('orderitem/01-06-2023/morning');
    this.orderItems = this.orderItemCollection.valueChanges();
    this.orderItemCollectionEve = this.firestore.collection('orderitem/01-06-2023/evening')
    this.orderItemsEve = this.orderItemCollectionEve.valueChanges();
  }

  getOrderItems(): Observable<any> {
    return this.orderItems;
  }

  getOrderItemsEve(): Observable<any> {
    return this.orderItemsEve;
  }

  async login(email: string, password: string): Promise<void> {
    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
      console.log('User logged in:', userCredential.user);
      this.router.navigate(['/dashboard'])
    } catch (error) {
      console.error('Login error:', error);
    }
  }
} 
