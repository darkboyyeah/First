 function AddLine(father, index, length) {
 	var ul = $("<ul/>");
 	father.append(ul);
 	for (var i = 0; i < length; i++) {
 		var li = $("<li/>");
 		ul.append(li);
 		ul.css({
 			bottom: index * $("li").height()
 		})
 	}
 	move(ul, father);
 }

 function move(tag, father) {
 	tag.animate({
 		left: father.width() - tag.width()
 	}, 2000, function() {
 		tag.animate({
 			left: 0
 		}, 2000, function() {
 			move(tag, father);
 		})
 	});
 }

 //current:本身就是ul对象
 function remove(before, current) {
 	var before_left = before.position().left;
 	var current_left = current.position().left;
 	//判断是左边去掉还是右边
 	var difference = current_left - before_left;
 	var direction_left = true;
 	if (difference > 0) {
 		direction_left = false;
 	}
 	var value = Math.abs(difference);
 	var num = parseInt(value / 10);
 	var removeIndex = 0;
 	for (var i = 0; i < num; i++) {
 		var li = current.children()[i];
 		$(li).remove();
 		if (direction_left) {
 			current.css({
 				left: current.position().left + 10
 			})
 		} else {
 			current.css({
 				left: current.position().right - 10
 			})
 		}

 		i--;
 		removeIndex++;
 		if (removeIndex == num) {
 			break;
 		}
 	}
 }