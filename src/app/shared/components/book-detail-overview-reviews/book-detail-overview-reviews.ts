import { CommonModule } from '@angular/common';
import {
  afterNextRender,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  inject,
  ViewChildren,
  QueryList,
} from '@angular/core';

import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';



export interface Reply {

  id: number;

  author: string;

  content: string;

  date: string;

  replyTo: string;

  likeCount: number;
}




export interface Review {

  id: number;

  author: string;

  content: string;

  rating: number;

  date: string;

  likeCount: number;


  showReplies: boolean;

  replies: Reply[];
}




@Component({

  selector:
    'app-book-detail-overview-reviews',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],

  templateUrl:
    './book-detail-overview-reviews.html',

  styleUrl:
    './book-detail-overview-reviews.css',
})
export class BookDetailOverviewReviews {



 @ViewChild('reviewsContainer')
  reviewsContainer!: ElementRef<HTMLElement>;
@ViewChildren('reviewContent')
reviewContentElements!: QueryList<ElementRef<HTMLElement>>;
  @ViewChildren('replyContent')
  replyContentElements!: QueryList<
    ElementRef<HTMLElement>
  >





  private cdr =
    inject(ChangeDetectorRef);

  expandedContents: string[] = [];

  overflowContents: string[] = [];

  showViewMore = false;

  isReviewsExpanded = false;
isShowReplyBox = false;
hasSubmittedReview = false;

isEditingReview = false;
myReview: Review | null = null;



  stars = [
    1,
    2,
    3,
    4,
    5,
  ];

  rating = 0;

  hoverRating = 0;

  author = '';

  content = '';

  authorTouched = false;

  contentTouched = false;


  replyContent = '';


  replyReviewId: number | null = null;


  replyTargetId: number | null = null;


  reviews: Review[] = [

    {
      id: 1,

      author:
        'Nguyễn Văn A',

      content:
        'Đây là một trong những cuốn sách hay nhất tôi từng đọc trong cuộc đời mình. Tác giả đã khéo léo dẫn dắt người đọc qua từng trang sách bằng ngôn ngữ giản dị nhưng đầy sức gợi cảm. Mỗi chương đều mở ra một góc nhìn mới về cuộc sống và con người, khiến tôi phải dừng lại suy nghĩ nhiều lần. Tôi đã đọc lại cuốn này 3 lần rồi và mỗi lần lại phát hiện thêm điều mới. Đặc biệt là phần kết — tôi đã khóc thật sự. Rất khuyến khích mọi người nên đọc ít nhất một lần trong đời!',

      rating: 5,

      date:
        '10/08/2025',

      likeCount: 14,

      showReplies: true,

      replies: [

        {
          id: 1,

          author:
            'Nguyễn Văn B',

          content:
            'Mình mua cuốn này theo lời giới thiệu của một người bạn và thật sự không thất vọng. Nội dung rất cuốn hút, viết theo lối kể chuyện sinh động nên rất dễ đọc. Điểm mình thích nhất là cách tác giả xây dựng nhân vật — mỗi nhân vật đều có chiều sâu tâm lý riêng, không hề bị làm cho đơn giản hay rập khuôn. Chỉ trừ một điểm là bản in lần này có vài lỗi typo nhỏ, hơi tiếc. Nhưng nhìn chung đây vẫn là một cuốn sách đáng đồng tiền bát gạo!',

          date:
            '12/05/2025',

        
          replyTo: '',

          likeCount: 2,
        },

        {
          id: 2,

          author:
            'Nguyễn Văn C',

          content:
            'Mình cũng rất thích cuốn sách này.',

          date:
            '13/05/2025',

          replyTo: '',

          likeCount: 4,
        },

      ],
    },

  ];




  constructor() {

    afterNextRender(() => {

      this.checkViewMore();
this.checkReviewOverflow();
this.checkReplyOverflow();
      this.cdr.detectChanges();

    });

  }



  toggleReviews(): void {

    this.isReviewsExpanded =
      !this.isReviewsExpanded;

  }


  private checkViewMore(): void {

    if (!this.reviewsContainer) {
      return;
    }

    const element =
      this.reviewsContainer.nativeElement;

    this.showViewMore =
      element.scrollHeight >
      element.clientHeight;

  }


  @HostListener('window:resize')
  onResize(): void {

    if (!this.isReviewsExpanded) {

      this.checkViewMore();
this.checkReviewOverflow();
this.checkReplyOverflow();
      this.cdr.detectChanges();

    }

  }



  selectRating(
    star: number
  ): void {

    this.rating = star;

  }


  get ratingText(): string {

    const currentRating =
      this.hoverRating ||
      this.rating;

    switch (currentRating) {

      case 1:
        return 'Rất tệ';

      case 2:
        return 'Tệ';

      case 3:
        return 'Bình thường';

      case 4:
        return 'Tốt';

      case 5:
        return 'Rất tốt';

      default:
        return '';

    }

  }




  isFormValid(): boolean {

    return (

      this.rating > 0 &&

      this.author
        .trim()
        .length > 0 &&

      this.content
        .trim()
        .length > 0

    );

  }




submitReview(): void {


    if (!this.isFormValid()) {
      return;
    }



    if (this.myReview === null) {

      const newReview: Review = {

        id: Date.now(),

        author:
          this.author.trim(),

        content:
          this.content.trim(),

        rating:
          this.rating,

        date:
          this.getCurrentDate(),

        likeCount:
          0,

        showReplies:
          false,

        replies:
          [],
      };


      this.myReview = newReview;


      this.reviews.unshift(
        newReview
      );


      console.log(
        'Đã gửi đánh giá:',
        this.myReview
      );

    }




    else {


      this.myReview.author =
        this.author.trim();

      this.myReview.content =
        this.content.trim();

      this.myReview.rating =
        this.rating;


      this.myReview.date =
        this.getCurrentDate();


      console.log(
        'Đã cập nhật đánh giá:',
        this.myReview
      );

    }




    this.isEditingReview = false;


   
    this.resetReviewForm();

  }




  editMyReview(): void {


    if (!this.myReview) {
      return;
    }




    this.author =
      this.myReview.author;

    this.content =
      this.myReview.content;

    this.rating =
      this.myReview.rating;



    this.isEditingReview = true;


    

  }


  cancelEditReview(): void {

    this.isEditingReview = false;

    this.resetReviewForm();

  }
  hasMyReview(): boolean {

    return this.myReview !== null;

  }



  resetReviewForm(): void {

    this.author = '';

    this.content = '';

    this.rating = 0;

    this.hoverRating = 0;

    this.authorTouched = false;

    this.contentTouched = false;

  }




  openReviewReply(
    review: Review
  ): void {

    console.log(
      'Mở reply review:',
      review.id
    );



    this.replyReviewId =
      review.id;


    
    this.replyTargetId =
      null;

 this.isShowReplyBox = true;
  
    this.replyContent = '';

  }




  openReplyToReply(
    review: Review,
    reply: Reply
  ): void {

    console.log(
      'Mở reply cho:',
      reply.author
    );


    this.replyReviewId =
      review.id;
 this.isShowReplyBox = true;

    this.replyTargetId =
      reply.id;


    this.replyContent = '';

  }






  getReplyPlaceholder(): string {

    if (
      this.replyTargetId !== null
    ) {

      return 'Viết phản hồi...';

    }


 
    return 'Viết phản hồi...';

  }



  closeReply(): void {
 this.isShowReplyBox = false;
    this.replyReviewId =
      null;

    this.replyTargetId =
      null;

    this.replyContent =
      '';

  }




  submitReply(
    review: Review
  ): void {

    const content =
      this.replyContent.trim();


    if (!content) {
      return;
    }


    if (
      this.replyReviewId === null
    ) {

      return;

    }


    let replyTo = '';

    if (
      this.replyTargetId !== null
    ) {

      const targetReply =
        review.replies.find(
          reply =>
            reply.id ===
            this.replyTargetId
        );


      if (targetReply) {

        replyTo =
          targetReply.author;

      }

    }
    const newReply: Reply = {

      id:
        Date.now(),

      author:
        'Bạn',

      content:
        content,

      date:
        this.getCurrentDate(),

      replyTo:
        replyTo,

      likeCount:
        0,

    };


    review.replies.push(
      newReply
    );



    review.showReplies =
      true;


    console.log(
      'Reply mới:',
      newReply
    );



    this.closeReply();

  }




  toggleReplies(
    review: Review
  ): void {

    review.showReplies =
      !review.showReplies;

  }



  likeReview(
    review: Review
  ): void {

    review.likeCount++;

  }


  likeReply(
    reply: Reply
  ): void {

    reply.likeCount++;

  }


  getCurrentDate(): string {

    const date =
      new Date();


    const day =
      String(
        date.getDate()
      ).padStart(
        2,
        '0'
      );


    const month =
      String(
        date.getMonth() + 1
      ).padStart(
        2,
        '0'
      );


    const year =
      date.getFullYear();


    return `${day}/${month}/${year}`;

  }



isContentExpanded(
  type: 'review' | 'reply',
  reviewId: number,
  replyId?: number
): boolean {

  const key =
    this.getContentKey(
      type,
      reviewId,
      replyId
    );

  return this.expandedContents.includes(key);
}
isContentOverflow(
  type: 'review' | 'reply',
  reviewId: number,
  replyId?: number
): boolean {

  const key = this.getContentKey(
    type,
    reviewId,
    replyId
  );

  return this.overflowContents.includes(key);
}



toggleContent(
  type: 'review' | 'reply',
  reviewId: number,
  replyId?: number
): void {

  const key = this.getContentKey(
    type,
    reviewId,
    replyId
  );

  const index =
    this.expandedContents.indexOf(key);

  if (index !== -1) {

    this.expandedContents.splice(
      index,
      1
    );

  } else {

    this.expandedContents.push(key);

  }
}

checkReviewOverflow(): void {


  this.overflowContents = [];


  this.reviewContentElements.forEach(
    (elementRef, index) => {

      const element =
        elementRef.nativeElement;


      const review =
        this.reviews[index];


      if (!review) {
        return;
      }


      const isOverflow =
        element.scrollHeight >
        element.clientHeight;


      if (isOverflow) {

        const key =
          this.getContentKey(
            'review',
            review.id
          );


        this.overflowContents.push(
          key
        );

      }

    }
  );

}
checkReplyOverflow(): void {

  let index = 0;

  console.log('=== checkReplyOverflow START ===');
  console.log('Total reviews:', this.reviews.length);
  console.log('replyContentElements:', this.replyContentElements);

  this.reviews.forEach((review, reviewIndex) => {

    console.log(`Review [${reviewIndex}]`, {
      reviewId: review.id,
      replies: review.replies
    });

    review.replies.forEach((reply, replyIndex) => {

      console.log(`Reply [${replyIndex}]`, {
        index,
        reviewId: review.id,
        replyId: reply.id
      });

      const elementRef =
        this.replyContentElements.get(index);

      console.log('elementRef:', elementRef);

      if (!elementRef) {
        console.warn(`No elementRef found at index ${index}`);
        index++;
        return;
      }

      const element =
        elementRef.nativeElement;

      console.log('Element:', element);
      console.log('scrollHeight:', element.scrollHeight);
      console.log('clientHeight:', element.clientHeight);

      const isOverflow =
        element.scrollHeight >
        element.clientHeight;

      console.log('isOverflow:', isOverflow);

      if (isOverflow) {

        const key =
          this.getContentKey(
            'reply',
            review.id,
            reply.id
          );

        console.log('Overflow key:', key);

        if (
          !this.overflowContents.includes(key)
        ) {

          console.log('Adding overflow key:', key);

          this.overflowContents.push(key);

        } else {
          console.log('Key already exists:', key);
        }
      }

      index++;
    });
  });

  console.log('Final overflowContents:', this.overflowContents);
  console.log(' checkReplyOverflow END');
}


private getContentKey(
  type: 'review' | 'reply',
  reviewId: number,
  replyId?: number
): string {

  if (type === 'review') {
    return `review-${reviewId}`;
  }

  return `reply-${reviewId}-${replyId}`;
}


}
