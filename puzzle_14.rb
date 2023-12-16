old_map = File.new('texts/puzzle_14.txt').read.split("\n")
map = old_map

hsh = Hash.new
start_of_loop_idx = 0
end_of_loop_idx = 0
counter = 0

loop do
  hsh[map.dup.join] = counter

  # North
  map.each_with_index do |line, line_idx|
    if line_idx >= 1
      line.chars.each_with_index do |char, char_idx|
        if char == 'O'
          times_rolled = 0
          loop do
            break if ((line_idx - times_rolled) - 1 < 0) || /[#O]/.match?(map[(line_idx - times_rolled) - 1][char_idx])
            times_rolled += 1
          end

          map[line_idx][char_idx] = '.'
          map[line_idx - times_rolled][char_idx] = 'O'
        end
      end
    end
  end

  # West
  map.each_with_index do |line, line_idx|
    line.chars.each_with_index do |char, char_idx|
      if char_idx >= 1
        if char == 'O'
          times_rolled = 0
          loop do
            break if ((char_idx - times_rolled) - 1 < 0) || /[#O]/.match?(map[line_idx][(char_idx - times_rolled) - 1])
            times_rolled += 1
          end

          map[line_idx][char_idx] = '.'
          map[line_idx][char_idx - times_rolled] = 'O'
        end
      end
    end
  end
  
  # South
  map.reverse!.each_with_index do |line, line_idx|
    if line_idx >= 1
      line.chars.each_with_index do |char, char_idx|
        if char == 'O'
          times_rolled = 0
          loop do
            break if ((line_idx - times_rolled) - 1 < 0) || /[#O]/.match?(map[(line_idx - times_rolled) - 1][char_idx])
            times_rolled += 1
          end

          map[line_idx][char_idx] = '.'
          map[line_idx - times_rolled][char_idx] = 'O'
        end
      end
    end
  end.reverse!

  map.map! do |line|
    line.reverse
  end

  # East
  map.each_with_index do |line, line_idx|
    line.chars.each_with_index do |char, char_idx|
      if char_idx >= 1
        if char == 'O'
          times_rolled = 0
          loop do
            break if ((char_idx - times_rolled) - 1 < 0) || /[#O]/.match?(map[line_idx][(char_idx - times_rolled) - 1])
            times_rolled += 1
          end

          map[line_idx][char_idx] = '.'
          map[line_idx][char_idx - times_rolled] = 'O'
        end
      end
    end
  end

  map.map! do |line|
    line.reverse
  end

  counter += 1

  total = 0
  map.each_with_index do |line, line_idx|
    sum_load = (map.size - line_idx)

    line.each_char do |char|
      total += sum_load if char == 'O'
    end
  end
  puts counter if total == 65

  if hsh.key?(map.dup.join)
    start_of_loop_idx = hsh[map.dup.join]
    break
  end
end
new_counter = (1000000000 - start_of_loop_idx) % (counter - start_of_loop_idx)

new_counter.times do |_|
  # North
  map.each_with_index do |line, line_idx|
    if line_idx >= 1
      line.chars.each_with_index do |char, char_idx|
        if char == 'O'
          times_rolled = 0
          loop do
            break if ((line_idx - times_rolled) - 1 < 0) || /[#O]/.match?(map[(line_idx - times_rolled) - 1][char_idx])
            times_rolled += 1
          end

          map[line_idx][char_idx] = '.'
          map[line_idx - times_rolled][char_idx] = 'O'
        end
      end
    end
  end

  # West
  map.each_with_index do |line, line_idx|
    line.chars.each_with_index do |char, char_idx|
      if char_idx >= 1
        if char == 'O'
          times_rolled = 0
          loop do
            break if ((char_idx - times_rolled) - 1 < 0) || /[#O]/.match?(map[line_idx][(char_idx - times_rolled) - 1])
            times_rolled += 1
          end

          map[line_idx][char_idx] = '.'
          map[line_idx][char_idx - times_rolled] = 'O'
        end
      end
    end
  end
  
  # South
  map.reverse!.each_with_index do |line, line_idx|
    if line_idx >= 1
      line.chars.each_with_index do |char, char_idx|
        if char == 'O'
          times_rolled = 0
          loop do
            break if ((line_idx - times_rolled) - 1 < 0) || /[#O]/.match?(map[(line_idx - times_rolled) - 1][char_idx])
            times_rolled += 1
          end

          map[line_idx][char_idx] = '.'
          map[line_idx - times_rolled][char_idx] = 'O'
        end
      end
    end
  end.reverse!

  map.map! do |line|
    line.reverse
  end

  # East
  map.each_with_index do |line, line_idx|
    line.chars.each_with_index do |char, char_idx|
      if char_idx >= 1
        if char == 'O'
          times_rolled = 0
          loop do
            break if ((char_idx - times_rolled) - 1 < 0) || /[#O]/.match?(map[line_idx][(char_idx - times_rolled) - 1])
            times_rolled += 1
          end

          map[line_idx][char_idx] = '.'
          map[line_idx][char_idx - times_rolled] = 'O'
        end
      end
    end
  end

  map.map! do |line|
    line.reverse!
  end
end

total = 0
map.each_with_index do |line, line_idx|
  sum_load = (map.size - line_idx)

  line.each_char do |char|
    total += sum_load if char == 'O'
  end
end

puts total