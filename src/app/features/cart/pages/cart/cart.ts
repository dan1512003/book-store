import { DecimalPipe, isPlatformBrowser } from '@angular/common';
import { afterNextRender, ChangeDetectorRef, Component, ElementRef, HostListener, inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
interface CartProduct {
  id: number;
  name: string;
  author: string;
  image: string;
  price: number;
  oldPrice: number;
  quantity: number;
  selected: boolean;
  
}
interface Gift {
  id: number;
   type: 'promotion' | 'gift';
  title: string;
  description: string;
  quantity: number;
   condition:string;
}
interface Promotion {
  id: number;
  code:string;
  title: string;
  description: string;
  selected: boolean;
  condition:string;
}
interface AppliedBenefit {

  name: string;
  amount: number;
}


interface CartSummary {
  subtotal: number;          
  appliedBenefits: AppliedBenefit[];
    promotionDiscount: number;
  shippingFee: number;       
  total: number;             
}


type ConditionFunction = (
  cartProducts: CartProduct[]
) => boolean;

class ConditionManager {

  private static conditions =
    new Map<string, ConditionFunction>();

  private constructor() {}

  static {

    this.registerCondition(
      'ebook_min_order_50000',
      (cartProducts) => {

        const subtotal = cartProducts
          .filter(product => product.selected)
          .reduce(
            (total, product) =>
              total + product.price * product.quantity,
            0
          );

        return subtotal >= 50000;
      }
    );
  this.registerCondition(
      'min_order_50000',
      (cartProducts) => {

        const subtotal = cartProducts
          .filter(product => product.selected)
          .reduce(
            (total, product) =>
              total + product.price * product.quantity,
            0
          );

        return subtotal >= 50000;
      }
    );
    this.registerCondition(
      'min_order_100000',
      (cartProducts) => {

        const subtotal = cartProducts
          .filter(product => product.selected)
          .reduce(
            (total, product) =>
              total + product.price * product.quantity,
            0
          );

        return subtotal >= 100000;
      }
    );
this.registerCondition(
      'min_order_150000',
      (cartProducts) => {

        const subtotal = cartProducts
          .filter(product => product.selected)
          .reduce(
            (total, product) =>
              total + product.price * product.quantity,
            0
          );

        return subtotal >= 15000;
      }
    );
    this.registerCondition(
      'min_order_200000',
      (cartProducts) => {

        const subtotal = cartProducts
          .filter(product => product.selected)
          .reduce(
            (total, product) =>
              total + product.price * product.quantity,
            0
          );

        return subtotal >= 200000;
      }
    );
  }

  static registerCondition(
    name: string,
    condition: ConditionFunction
  ): void {

    this.conditions.set(name, condition);
  }

  static checkCondition(
    name: string,
    cartProducts: CartProduct[]
  ): boolean {

    const condition =
      this.conditions.get(name);

    if (!condition) {
      console.warn(`Condition not found: ${name}`);
      return false;
    }

    return condition(cartProducts);
  }
}
type ResultFunction = (
cartProducts: CartProduct[],
  cartsummary: CartSummary,

) => void;
class ResultManager {

  private static results =
    new Map<string, ResultFunction>();

  private constructor() {}

  static {

  this.registerResult(
      '5GBYZTX',
      (cartProducts, cartsummary) => {

        const subtotal = cartProducts
          .filter(product => product.selected)
          .reduce(
            (total, product) =>
              total + product.price * product.quantity,
            0
          );

      cartsummary.appliedBenefits.push({
          name: '5GBYZTX',
          amount: subtotal * 0.1
        });
      }
    );
      this.registerResult(
      'GIAM15',
      (cartProducts, cartsummary) => {

        const subtotal = cartProducts
          .filter(product => product.selected)
          .reduce(
            (total, product) =>
              total + product.price * product.quantity,
            0
          );

      cartsummary.appliedBenefits.push({
          name: 'GIAM15',
          amount: subtotal * 0.15
        });
      }
    );
  this.registerResult(
      'GIAM20',
      (cartProducts, cartsummary) => {

        const subtotal = cartProducts
          .filter(product => product.selected)
          .reduce(
            (total, product) =>
              total + product.price * product.quantity,
            0
          );

      cartsummary.appliedBenefits.push({
          name: 'GIAM20',
          amount: subtotal * 0.2
        });
      }
    );
  }

  static registerResult(
    name: string,
    resultFunction: ResultFunction
  ): void {

    this.results.set(name, resultFunction);
  }

  static applyResult(
    name: string,
    cartProducts: CartProduct[],
    cartsummary: CartSummary 
  ): void {

    const resultFunction =
      this.results.get(name);

    if (!resultFunction) {
      console.warn(`Result not found: ${name}`);
      return;
    }

    resultFunction(cartProducts,cartsummary);
  }
}
@Component({
  imports: [DecimalPipe,FormsModule],
  selector: 'app-cart',
  styleUrl: './cart.css',
  templateUrl: './cart.html',
})
export class Cart {
    private readonly platformId = inject(PLATFORM_ID);
   private readonly cdr = inject(ChangeDetectorRef);
  @ViewChild('relatedContent')
  relatedContent?: ElementRef<HTMLDivElement>;
  hasRelatedScroll = false;
  isPromotionOpen = false;
isGiftOpen = false;
isSelectAll = false;
promotionCode = '';
promotionError = '';
cartProducts: CartProduct[] = [
  {
    id: 1,
    name: 'Ba gã cùng thuyền (chưa kể con chó)',
    author: 'Jerome K Jerome',
    image: '/assets/images/books/ba-ga-cung-thuyen-chua-ke-con-cho-01.jpg',
    price: 68000,
    oldPrice: 85000,
    quantity: 1,
    selected: false
  }
];
cartSummary: CartSummary = {
  subtotal: 0,
  appliedBenefits: [],
  promotionDiscount: 0,
  shippingFee: 0,
  total: 0
};
relatedProducts: CartProduct[] = [
  {
    id: 2,
    name: 'Ba Gã Cùng Thuyền',
    author: 'Jerome K Jerome',
    image: '/assets/images/books/ba-ga-cung-thuyen-chua-ke-con-cho.webp',
    price: 66000,
    oldPrice: 88000,
    quantity: 1,
    selected: false
  },
  {
    id: 3,
    name: 'Ba Gã Cùng Thuyền',
    author: 'Jerome K Jerome',
    image: '/assets/images/books/ba-ga-cung-thuyen-chua-ke-con-cho.webp',
    price: 66000,
    oldPrice: 88000,
    quantity: 1,
    selected: false
  },
  {
    id: 4,
    name: 'Ba Gã Cùng Thuyền',
    author: 'Jerome K Jerome',
    image: '/assets/images/books/ba-ga-cung-thuyen-chua-ke-con-cho.webp',
    price: 66000,
    oldPrice: 88000,
    quantity: 1,
    selected: false
  }
];

promotions: Promotion[] = [
  {
    id: 1,
    code: '5GBYZTX',
    title: 'Giảm 10% toàn bộ đơn hàng',
    description: 'Áp dụng cho đơn hàng từ 100.000₫',
    selected: false,
    condition: 'min_order_100000'
  },
  {
    id: 2,
    code: 'GIAM15',
    title: 'Giảm 15% toàn bộ đơn hàng',
    description: 'Áp dụng cho đơn hàng từ 150.000₫',
    selected: false,
    condition: 'min_order_150000'
  },
  {
    id: 3,
    code: 'GIAM20',
    title: 'Giảm 20% sản phẩm',
    description: 'Áp dụng cho đơn hàng từ 200.000₫',
    selected: false,
    condition: 'min_order_200000'
  }
];

gifts: Gift[] = [
  {
    id: 1,
    type: 'gift',
    title: 'Tặng E-book',
  
    description: 'Áp dụng khi mua đơn hàng 50k trở lên',
    quantity: 1,
    condition: 'ebook_min_order_50000'
  },
    {
    id: 2,
    type: 'promotion',
    title: 'Tặng E-voucher Ưu Đãi 100K tại ',
  
    description: 'Áp dụng khi mua đơn hàng 50k trở lên',
    quantity: 1,
    condition: 'min_order_50000'
  }
];



    constructor() {

    afterNextRender(() => {

    this.updateRelatedScrollState();
    });
  }


   @HostListener('window:resize')
onResize(): void {
 
  requestAnimationFrame(() => {
this.updateRelatedScrollState();
   
  });

 
}
addToCart(product: CartProduct) {
  const existingProduct = this.cartProducts.find(
    item => item.id === product.id
  );

  if (existingProduct) {
    existingProduct.quantity++;
    return;
  }

  this.cartProducts.push({
    ...product,
    quantity: 1,
    selected: false
  });

}
removeFromCart(productId: number) {
  this.cartProducts = this.cartProducts.filter(
    product => product.id !== productId
  );
  this.calculateCartSummary()
}
increaseQuantity(product: CartProduct) {
  product.quantity++;
   this.calculateCartSummary()
}

decreaseQuantity(product: CartProduct) {
  if (product.quantity > 1) {
    product.quantity--;
     this.calculateCartSummary()
  }
}
getProductTotal(product: CartProduct): number {
  return product.price * product.quantity;
}
calculateSubtotal(): number {
  return this.cartProducts
    .filter(product => product.selected)
    .reduce(
      (total, product) =>
        total + product.price * product.quantity,
      0
    );
}
calculatePromotionDiscount(): number {

  return this.cartSummary.appliedBenefits.reduce(
      (total, benefit) => total + benefit.amount,
      0
    );
}
checkPromotionCondition(conditionName: string): boolean {

  const promotion = this.promotions.find(
    promotion => promotion.condition === conditionName
  );

  if (!promotion) {
    return false;
  }

  return ConditionManager.checkCondition(
    promotion.condition,
    this.cartProducts
  );
}
checkGiftCondition(conditionName: string): boolean {

  const gift = this.gifts.find(
    gift => gift.condition === conditionName
  );

  if (!gift) {
    return false;
  }

  return ConditionManager.checkCondition(
    gift.condition,
    this.cartProducts
  );
}
getAvailableGiftCount(): number {
  return this.gifts.filter(gift =>
    ConditionManager.checkCondition(
      gift.condition,
      this.cartProducts
    )
  ).length;
}

calculateCartSummary(): void {

  const subtotal = this.calculateSubtotal();

  const promotionDiscount =
    this.calculatePromotionDiscount();

  const shippingFee = 0;

  const total =
    subtotal -
    promotionDiscount +
    shippingFee;

  this.cartSummary = {
    subtotal,
    appliedBenefits: this.cartSummary.appliedBenefits,
    promotionDiscount,
    shippingFee,
    total
  };
}
onProductSelectionChange(): void {
  this.isSelectAll =
    this.cartProducts.length > 0 &&
    this.cartProducts.every(product => product.selected);

  this.calculateCartSummary();
}

getSelectedProductCount(): number {
  return this.cartProducts.filter(
    product => product.selected
  ).length;
}

hasSelectedProducts(): boolean {
  return this.cartProducts.some(
    product => product.selected
  );
}

toggleSelectAll(): void {
  this.cartProducts.forEach(product => {
    product.selected = this.isSelectAll;
  });

  this.calculateCartSummary();
}


deleteSelectedProducts(): void {
  this.cartProducts = this.cartProducts.filter(
    product => !product.selected
  );

  this.isSelectAll = false;

  this.calculateCartSummary();
}


getSelectedPromotionCount(): number {
  return this.promotions.filter(
    promotion => promotion.selected
  ).length;
}
applySelectedPromotions(): void {

  this.cartSummary.appliedBenefits =
    this.cartSummary.appliedBenefits.filter(benefit => {
      return this.promotions.some(
        promotion =>
          promotion.selected &&
          promotion.code === benefit.name
      );
    });

  for (const promotion of this.promotions) {

    if (!promotion.selected) {
      continue;
    }

    const isValid = ConditionManager.checkCondition(
      promotion.condition,
      this.cartProducts
    );

  
    if (!isValid) {
      this.cartSummary.appliedBenefits =
        this.cartSummary.appliedBenefits.filter(
          benefit => benefit.name !== promotion.code
        );

      continue;
    }

    const alreadyApplied =
      this.cartSummary.appliedBenefits.some(
        benefit => benefit.name === promotion.code
      );

    if (alreadyApplied) {
      continue;
    }

    ResultManager.applyResult(
      promotion.code,
      this.cartProducts,
      this.cartSummary
    );
  }

  this.calculateCartSummary();
}


applyPromotion(): void {
  const code = this.promotionCode.trim().toUpperCase();

  this.promotionError = '';


  if (!code) {
    this.promotionError = 'Vui lòng nhập mã giảm giá';
    return;
  }


  const promotion = this.promotions.find(
    promotion => promotion.code.toUpperCase() === code
  );


  if (!promotion) {
    this.promotionError = 'Mã giảm giá không tồn tại';
    return;
  }


  const alreadyApplied =
    this.cartSummary.appliedBenefits.some(
      benefit => benefit.name === promotion.code
    );

  if (alreadyApplied) {
    this.promotionError = 'Mã giảm giá đã được kích hoạt';
    return;
  }


  const isValid = ConditionManager.checkCondition(
    promotion.condition,
    this.cartProducts
  );

  if (!isValid) {
    this.promotionError = 'Mã giảm giá chưa đủ điều kiện';
    return;
  }


  promotion.selected = true;

  ResultManager.applyResult(
    promotion.code,
    this.cartProducts,
    this.cartSummary
  );

  this.calculateCartSummary();

  this.promotionCode = '';
}

openPromotion() {
  this.isPromotionOpen = true;
  document.body.classList.add('side-nav-open');
}

closePromotion() {
  this.applySelectedPromotions();
  this.isPromotionOpen = false;
  document.body.classList.remove('side-nav-open');
}
openGift() {
  this.isGiftOpen = true;
    document.body.classList.add('side-nav-open');
}

closeGift() {
  this.isGiftOpen = false;
    document.body.classList.remove('side-nav-open');
}
 onRelatedScroll(): void {
    this.updateRelatedScrollState();
  }
  scrollRelatedContent(direction: 'left' | 'right'): void {
    const container = this.relatedContent?.nativeElement;
    if (!container) return;

   
    const card = container.querySelector<HTMLDivElement>('.cart-related-product');
    if (!card) return;

  
    const style = getComputedStyle(container);
    const gap = parseFloat(style.columnGap) || parseFloat(style.gap) || 0;

    
    const scrollAmount = card.offsetWidth + gap;

    container.scrollBy({
      left: direction === 'right' ? scrollAmount : -scrollAmount,
      behavior: 'smooth',
    });

    setTimeout(() => {
      this.updateRelatedScrollState();
    }, 350);
  }

  updateRelatedScrollState(): void {
    const container = this.relatedContent?.nativeElement;

    if (!container || !isPlatformBrowser(this.platformId)) {
      this.hasRelatedScroll = false;
 this.cdr.detectChanges();
      return;
    }

    const clientWidth = container.clientWidth;
    const scrollWidth = container.scrollWidth;

    this.hasRelatedScroll = Math.round(scrollWidth) > Math.round(clientWidth) + 1;
    console.log('relatedscroll:',this.hasRelatedScroll)
this.cdr.detectChanges();
  }
}
