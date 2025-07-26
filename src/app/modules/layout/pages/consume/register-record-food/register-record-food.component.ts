import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'app-register-record-food',
  standalone: true,
  imports: [CommonModule, MatRippleModule],
  templateUrl: './register-record-food.component.html',
  styleUrls: ['./register-record-food.component.scss']
})
export class RegisterRecordFoodComponent {

  digits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  products = [
    { name: 'Imperdible', image: 'combo.png' },
    { name: 'Bebidas', image: 'bebida.png' },
    { name: 'cajita_feliz', image: 'cajita_feliz.png' },
  ];

  quantityBuffer = '';
  isDraggingQty = false;
  dragQuantityPreview = 1;
  highlightedProductId: number | null = null;
  activeDigitIndex: number | null = null;

  private removeMoveListener?: () => void;
  private removeUpListener?: () => void;

  appendDigit(n: number) {
    if (this.isDraggingQty) return;
    this.quantityBuffer += n.toString();
  }

  startDrag(n: number, idx: number, ev: PointerEvent) {
    ev.preventDefault();

    this.quantityBuffer += n.toString();


    this.activeDigitIndex = idx;
    this.isDraggingQty = true;
    this.dragQuantityPreview = parseInt(this.quantityBuffer, 10) || 1;

    const move = (e: PointerEvent) => this.onDragMove(e);
    const up = (e: PointerEvent) => this.onDragEnd(e);

    window.addEventListener('pointermove', move, { passive: false });
    window.addEventListener('pointerup', up, { passive: false });

    this.removeMoveListener = () => window.removeEventListener('pointermove', move);
    this.removeUpListener = () => window.removeEventListener('pointerup', up);
  }

  private onDragMove(ev: PointerEvent) {
    ev.preventDefault();

    const el = document.elementFromPoint(ev.clientX, ev.clientY);
    const productEl = el?.closest?.('[data-product-id]') as HTMLElement | null;

    if (productEl) {
      const id = Number(productEl.getAttribute('data-product-id'));
      this.highlightedProductId = isNaN(id) ? null : id;
    } else {
      this.highlightedProductId = null;
    }
  }

  private onDragEnd(ev: PointerEvent) {
    ev.preventDefault();

    const quantity = Math.max(1, Number(this.quantityBuffer) || 1);

    if (this.highlightedProductId != null) {
      const product = this.products[this.highlightedProductId];
      this.addToCart(product, quantity);
    }


    this.quantityBuffer = '';
    this.dragQuantityPreview = 1;
    this.highlightedProductId = null;
    this.isDraggingQty = false;
    this.activeDigitIndex = null;

    this.removeMoveListener?.();
    this.removeUpListener?.();
  }



  cart: { product: any; qty: number }[] = [];

  private addToCart(product: any, qty: number) {
  
    const existing = this.cart.find(item => item.product.name === product.name);
    if (existing) {
      existing.qty += qty;
    } else {
      this.cart.push({ product, qty });
    }

    console.log('Carrito:', this.cart);
  }

}
